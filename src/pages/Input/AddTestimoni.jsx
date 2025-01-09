import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddTestimoni() {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [feedback, setFeedback] = useState("");
    const [image, setImage] = useState(null); // Gunakan null untuk file input
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Cek apakah file yang diupload berupa JPG atau PNG
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImage(file);
        } else {
            alert("Tolong unggah file gambar dengan format JPG atau PNG.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("company", company);
        formData.append("role", role);
        formData.append("feedback", feedback);
        if (image) {
            formData.append("image", image);
        }

        axios
            .post("http://127.0.0.1:8000/api/testi", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Mengatur header untuk FormData
                },
            })
            .then(() => {
                alert("Testimoni berhasil ditambahkan");
                navigate("/tabel"); // Kembali ke halaman tabel
            })
            .catch((error) => {
                console.error(error);
                alert("Gagal menambahkan testimoni");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
            <Button
                color="gray"
                onClick={() => navigate("/admin/tabel")}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
                &#8592;
           </Button>
                <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
                    Tambah Testimoni
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Nama"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Instansi"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Peran"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Pesan"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Foto (JPG/PNG)</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <Button type="submit" color="blue" fullWidth className="py-3">
                        Simpan Testimoni
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default AddTestimoni;
