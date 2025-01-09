import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddLayanan() {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto1, setFoto1] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("deskripsi", deskripsi);
    formData.append("foto_1", foto1);
    formData.append("foto_2", foto2);

    axios
      .post("http://127.0.0.1:8000/api/titles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Layanan berhasil ditambahkan");
        navigate("/layanan"); // Kembali ke halaman layanan setelah berhasil
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan layanan");
      });
  };

  const handleFileChange1 = (e) => {
    setFoto1(e.target.files[0]);
  };

  const handleFileChange2 = (e) => {
    setFoto2(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white relative">
        
        {/* Tombol Kembali */}
        <Button
          color="gray"
          onClick={() => navigate("/admin/layanan")}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
        >
          &#8592;
        </Button>

        <CardBody>
          <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
            Tambah Layanan
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Input Nama Layanan */}
            <div className="mb-6">
              <Input
                label="Nama Layanan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Input Deskripsi */}
            <div className="mb-6">
              <Input
                label="Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                size="lg"
                required
                className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Input Foto 1 */}
            <div className="mb-6">
              <input
                type="file"
                onChange={handleFileChange1}
                required
                className="block w-full py-2 px-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Input Foto 2 */}
            <div className="mb-6">
              <input
                type="file"
                onChange={handleFileChange2}
                required
                className="block w-full py-2 px-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Button Simpan */}
            <div className="flex gap-6 mb-6">
              <Button
                type="submit"
                color="blue"
                fullWidth
                className="rounded-lg py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                Simpan Layanan
              </Button>
            </div>

            
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddLayanan;
