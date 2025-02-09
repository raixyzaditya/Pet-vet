import express from "express"
import mongoose from "mongoose"
import Owner from "./ownerdb.js"
import { Hashpass } from "./encrypt.js"
import { Compare } from "./encrypt.js"
import session from "express-session"
import bcrypt from 'bcrypt'
import cors from 'cors'
import Doctor from "./doctordb.js"
import Appoint from "./appointmentdb.js"
import multer from "multer"
import path from "path"
import { ObjectId } from "mongoose";


import { fileURLToPath } from "url";
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose.connect("mongodb://localhost:27017/owner_data").then(() => console.log("Connected to DB..")).catch((err) => console.log(err))
app.use(cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true  // ⬅️ Allow cookies/session sharing
}))
app.use(express.json())
app.use("/uploads", express.static(path.join("uploads")))
app.use(session({
    secret: "owner_pets", // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the uploads/ directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });
app.post('/register/owner', upload.single("vaccin_certificate"), async (req, res) => {
    try {
        console.log(req.body)
        let { username, email, contact, street, state, country, zip, password, pet_name, pet_species, weight } = req.body
        const saltRounds = 5;
        password = await bcrypt.hash(password, saltRounds);
        console.log("Password hashed successfully");
        const adduser = new Owner({
            username,
            email,
            contact,
            street,
            state,
            country,
            zip,
            password,
            pet_name,
            pet_species,
            weight,
            vaccin_certificate: req.file ? `/uploads/${req.file.filename}` : null
        })

        await adduser.save()
        return res.json({ message: "Data added to db" })
    } catch (error) {
        console.error("Error in /register/owner:", error);
        return res.status(500).json({ error: "error in registration" })
    }
})

app.post("/register/doctor", async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: "Doctor reg successfull" })
    } catch (error) {
        console.error("Error registering doctor:", error);
        res.status(500).json({ error: "Error in registration" });
    }
});
app.post('/login/owner', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Owner.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.status(400).json({ error: "Invalid password" });
        }
        req.session.ownerId = user._id;
        return res.status(200).json({ message: "Login successful!", name: `${user.username}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error logging in" });
    }
})
app.post('/login/doctor', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the doctor by email
        const user = await Doctor.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare entered password with hashed password


        // Store doctor ID in session
        req.session.doctorId = user._id;
        console.log("Doctor session created:", req.session.doctorId);
        console.log(user._id.toString())
        return res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                specialization: user.specialization,
                hospital_name: user.hospital_name
            }
        });

    } catch (error) {
        console.error("Error in doctor login:", error);
        return res.status(500).json({ error: "Error logging in" });
    }
});
app.get('/get/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find()
        return res.status(200).json(doctors)
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
})


app.post('/get/appointment', upload.single("vaccin"), async (req, res) => {
    try {
        const { doctorId, date, time, patientName, phone, vaccin } = req.body
        const data = new Appoint({
            doctorId,
            date,
            time,
            patientName,
            phone,
            vaccin: req.file ? `/uploads/${req.file.filename}` : null,


        })
        await data.save();
        return res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to book appointment" });
    }
})
app.get("/a", async (req, res) => {
    try {
        const { id } = req.query;

        // Validate if ID exists and is a valid MongoDB ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid doctor ID format" });
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const appointments = await Appoint.find({ doctorId: objectId });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.json(appointments); // Ensure response includes the correct data
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api', async (req, res) => {
    const check = await Appoint.find()

    console.log(check)
    res.status(200)
})

app.listen(5000, () => console.log("Hey i am listening..."))
