import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddPaket() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [is_active, setIsActive] = useState(true); // Status aktif atau tidak
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      price,
      is_active,
    };

    axios
      .post("http://127.0.0.1:8000/api/packages", formData)
      .then(() => {
        alert("Paket berhasil ditambahkan");
        navigate("/paket"); // Kembali ke halaman paket setelah berhasil
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan paket");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white relative">
        {/* Tombol Kembali */}
        <Button
          color="gray"
          onClick={() => navigate("/admin/paket")}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
        >
          &#8592;
        </Button>
        <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Tambah Paket
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              label="Nama Paket"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              required
              className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
              required
              className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              size="lg"
              required
              className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm">Status</label>
            <div className="flex items-center gap-4">
              {/* Radio Button Aktif */}
              <div
                className={`flex items-center cursor-pointer ${is_active ? "text-blue-600" : "text-gray-500"}`}
                onClick={() => setIsActive(true)}
              >
                <input
                  type="radio"
                  id="aktif"
                  name="status"
                  checked={is_active}
                  onChange={() => setIsActive(true)}
                  className={`form-radio ${is_active ? "text-blue-600" : "text-gray-500"}`}
                />
                <label htmlFor="aktif" className="ml-2">Aktif</label>
              </div>
              {/* Radio Button Tidak Aktif */}
              <div
                className={`flex items-center cursor-pointer ${!is_active ? "text-red-600" : "text-gray-500"}`}
                onClick={() => setIsActive(false)}
              >
                <input
                  type="radio"
                  id="tidak-aktif"
                  name="status"
                  checked={!is_active}
                  onChange={() => setIsActive(false)}
                  className={`form-radio ${!is_active ? "text-red-600" : "text-gray-500"}`}
                />
                <label htmlFor="tidak-aktif" className="ml-2">Tidak Aktif</label>
              </div>
            </div>
          </div>
          {/* Tombol Simpan Paket */}
          <Button
            type="submit"
            color={is_active ? "blue" : "blue"} // Mengubah warna tombol berdasarkan status
            fullWidth
            className="rounded-lg py-3"
          >
            Simpan Paket
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddPaket;
