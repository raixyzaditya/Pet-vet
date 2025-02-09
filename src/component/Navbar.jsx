import { useState } from "react"
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginDrop, setLoginDrop] = useState(false)
    return (
        <nav className="navbar">


            <div className="logo"><img src="./logo.png" alt="pet" />PetVet</div>


            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><a href="/">Home</a></li>



                <li><a href="/Emergency.html">Emergency Care(Ask From AI)</a></li>
                <li><a href="/healthguide">Health Guide</a></li>
                <li><a href="/appointment">Our Doctors</a></li>

                <li className="dropdown"
                    onClick={() => setLoginDrop(!loginDrop)}>
                    <a href="#" className="login-btn">Login</a>
                    {loginDrop && (<ul className="dropdown-menu">
                        <li><a href="/login">Login as Pet Owner</a></li>
                        <li><a href="/doctor/register">Register as PetVet</a></li>


                    </ul>)}

                </li>
                <li><a href="/Doclogin" className="login-btn">Login as Doctor</a></li>

            </ul>

            {/* Mobile Menu Button */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
        </nav>
    )
}

export default Navbar