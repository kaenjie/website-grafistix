import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddPortofolio() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_id", title);
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:8000/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Portofolio berhasil ditambahkan");
        navigate("/portofolio"); // Arahkan kembali ke halaman portofolio setelah berhasil
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan portofolio");
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      
      <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white relative">
      
      {/* Tombol Kembali */}
      <Button
        color="gray"
        onClick={() => navigate("/admin/port")}
        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
      >
        &#8592;
      </Button>

        <CardBody>
          <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
            Tambah Portofolio
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Judul Portofolio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="lg"
                required
                className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div className="mb-6">
              <Input
                type="file"
                onChange={handleFileChange}
                size="lg"
                required
                className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div className="flex gap-6 mb-6">
              <Button
                type="submit"
                color="blue"
                fullWidth
                className="rounded-lg py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                Simpan Portofolio
              </Button>
            </div>

            <div className="flex gap-6">
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddPortofolio;
