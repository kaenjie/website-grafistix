import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Portofolio from "./Views/Portofolio";
import Layanan from "./Views/Layanan";
import Pemesanan from "./Views/Pemesanan";
import Form from "./Views/Form";
import Beranda from "./Views/Beranda";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/" element={<Beranda />} />
      <Route path="/portofolio" element={<Portofolio />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/pemesanan" element={<Pemesanan />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
