import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddPesanan() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [packageId, setPackageId] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const orderData = {
            full_name: fullName,
            email,
            address,
            city,
            payment_method: paymentMethod,
            id_paket: packageId,
            order_date: orderDate,
        };

        axios
            .post("http://127.0.0.1:8000/api/orders", orderData)
            .then(() => {
                alert("Pesanan berhasil ditambahkan");
                navigate("/pesanan"); // Kembali ke halaman daftar pesanan
            })
            .catch((error) => {
                console.error(error);
                alert("Gagal menambahkan pesanan");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-2xl mx-4 p-8 border-2 border-gray-300 rounded-xl shadow-lg bg-white">
                {/* Tombol Kembali */}
                <Button
                    color="gray"
                    onClick={() => navigate("/admin/pesanan")}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                >
                    &#8592;
                </Button>
            
                <Typography variant="h6" className="text-center text-3xl font-semibold text-gray-800 mb-6">
                    Tambah Pesanan
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Nama"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Alamat"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Kota"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 rounded-lg border"
                            required
                        >
                            <option value="">Metode Pembayaran</option>
                            <option value="Ovo">Ovo</option>
                            <option value="Dana">Dana</option>
                            <option value="ShopeePay">ShopeePay</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Paket ID"
                            value={packageId}
                            onChange={(e) => setPackageId(e.target.value)}
                            size="lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Tanggal"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            size="lg"
                            required
                            type="date"
                        />
                    </div>
                    <Button type="submit" color="blue" fullWidth className="py-3">
                        Simpan Pesanan
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default AddPesanan;
