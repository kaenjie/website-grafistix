import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Judul from "../Component/Layanan/Judul";
import Logo from "../Component/Layanan/Logo";
import Custom from "../Component/Layanan/Custom";
import Ig from "../Component/Layanan/Ig";
import Merch from "../Component/Layanan/Merch";
import Axios from "axios";
import { useState, useEffect } from "react";

function Beranda() {
  const [data, setData] = useState({
    logoData: null,
    customData: null,
    igData: null,
    merchData: null,
  });

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/titles`)
      .then((response) => {
        console.log("data: ", response.data);
  
        // Pastikan response.data.data adalah array
        if (Array.isArray(response.data.data)) {
          const dataResponse = response.data.data;
  
          setData({
            logoData: dataResponse.find((item) => item.id === 1), // ID 1 untuk Logo
            customData: dataResponse.find((item) => item.id === 2), // ID 2 untuk Custom
            igData: dataResponse.find((item) => item.id === 3),    // ID 3 untuk Ig
            merchData: dataResponse.find((item) => item.id === 4),  // ID 4 untuk Merch
          });
        } else {
          console.error("Response data is not an array");
        }
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  }, []);
  

  return (
    <div className="min-h-screen">
      <div className="bg-[#0F172A] text-slate-200">
        <Navbar />
        <Judul />

        {/* Menampilkan komponen dengan data sesuai ID */}
        {data.logoData && <Logo data={data.logoData} />}
        {data.customData && <Custom data={data.customData} />}
        {data.igData && <Ig data={data.igData} />}
        {data.merchData && <Merch data={data.merchData} />}

        <Footer />
      </div>
    </div>
  );
}

export default Beranda;
