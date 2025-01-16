import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddTentangKami() {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("deskripsi", deskripsi);
        formData.append("file", file);

        axios
            .post("http://127.0.0.1:8000/api/about", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Data tentang kami berhasil ditambahkan");
                navigate("/tabel"); // Kembali ke halaman tabel
            })
            .catch((error) => {
                console.error(error);
                alert("Gagal menambahkan data tentang kami");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
            <Button
            color="gray"
            onClick={() => navigate("/admin/layanan")}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
          >
            &#8592;
          </Button>        
                <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
                    Tambah Data Tentang Kami
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Deskripsi"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <Button type="submit" color="blue" fullWidth className="py-3">
                        Simpan Data
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default AddTentangKami;
