import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddFAQ() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFAQ = { question, answer };

        axios
            .post("http://127.0.0.1:8000/api/faq", newFAQ)
            .then(() => {
                alert("FAQ berhasil ditambahkan");
                navigate("/tabel"); // Kembali ke halaman tabel
            })
            .catch((error) => {
                console.error(error);
                alert("Gagal menambahkan FAQ");
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
                    Tambah FAQ
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Pertanyaan"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Jawaban"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <Button type="submit" color="blue" fullWidth className="py-3">
                        Simpan FAQ
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default AddFAQ;
