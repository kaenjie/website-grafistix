import { Routes, Route, Navigate } from "react-router-dom";
import { Admin, Auth } from "@/layouts";
import Portofolio from "./Views/Portofolio";
import Layanan from "./Views/Layanan";
import Pemesanan from "./Views/Pemesanan";
import Form from "./Views/Form";
import Beranda from "./Views/Beranda";
import AddPortofolio from "./pages/Input/AddPortofolio"; // Path yang benar sesuai dengan struktur folder
import AddLayanan from "./pages/Input/AddLayanan"; // Import AddLayanan component
import AddPaket from "./pages/Input/AddPaket"; // Import AddPaket component
import AddPesanan from "./pages/Input/AddPesanan";
import AddTestimoni from "./pages/Input/AddTestimoni";
import AddTentangKami from "./pages/Input/AddTentangKami";
import AddFAQ from "./pages/Input/AddFAQ";
import AddBanner from "./pages/Input/AddBanner";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Routes>
      <Route path="/admin/*" 
      element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Admin />} />}
      />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/admin/profil" replace />} />
      <Route path="/" element={<Beranda />} />
      <Route path="/portofolio" element={<Portofolio />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/pemesanan" element={<Pemesanan />} />
      <Route path="/form" element={<Form />} />
      <Route path="/portofolio/add" element={<AddPortofolio />} />
      <Route path="/add-layanan" element={<AddLayanan />} />
      <Route path="/paket/add" element={<AddPaket />} />
      <Route path="/add-pesanan" element={<AddPesanan />} />
      <Route path="/add-testimoni" element={<AddTestimoni />} />
      <Route path="/add-tentang-kami" element={<AddTentangKami />} />
      <Route path="/add-faq" element={<AddFAQ />} />
      <Route path="/add-banner" element={<AddBanner />} />
    </Routes>
  );
}

export default App;
