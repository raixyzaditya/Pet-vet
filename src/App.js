import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Healthguide from "./pages/Healthguide";
import Register from "./pages/Register";
import Docreg from "./pages/Docreg";
import Bookdoc from "./pages/Bookdoc";
import Appoint from "./pages/Appoint";
import Doclogin from "./pages/Doclogin";
import Docdash from "./pages/Docdash";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/doctor/dashboard"]; // Routes where Navbar should be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
