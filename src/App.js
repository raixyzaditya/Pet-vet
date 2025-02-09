import Navbar from "./component/Navbar";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Healthguide from "./pages/Healthguide";
import Register from "./pages/Register";
import Docreg from "./pages/Docreg";
import Bookdoc from "./pages/Bookdoc";
import Appoint from "./pages/Appoint";
import Doclogin from "./pages/Doclogin";
import Docdash from "./pages/Docdash";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <BrowserRouter>
      {location.pathname !== "/doctor/dashboard" && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Aboutus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/healthguide" element={<Healthguide />} />
        <Route path="/doctor/register" element={<Docreg />} />
        <Route path="/appointment" element={<Bookdoc />} />
        <Route path="/appointreg" element={<Appoint />} />
        <Route path="/Doclogin" element={<Doclogin />} />
        <Route path="/doctor/dashboard" element={<Docdash />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
