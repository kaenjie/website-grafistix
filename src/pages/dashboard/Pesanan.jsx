import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  export function Pesanan() {
    const [order, setOrder] = useState([
      {
        id: 1,
        full_name: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
        city: "New York",
        payment_method: "Credit Card",
        id_paket: "Paket A",
        order_date: "2025-01-01",
      },
      {
        id: 2,
        full_name: "Jane Smith",
        email: "jane@example.com",
        address: "456 Oak St",
        city: "Los Angeles",
        payment_method: "PayPal",
        id_paket: "Paket B",
        order_date: "2025-01-02",
      },
    ]);
    const [formData, setFormData] = useState({
      id: null,
      full_name: "",
      email: "",
      address: "",
      city: "",
      payment_method: "",
      id_paket: "",
      order_date: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle add or update data
    const handleSubmit = () => {
      if (isEditing) {
        setOrder(
          order.map((item) =>
            item.id === formData.id ? { ...formData } : item
          )
        );
        setIsEditing(false);
      } else {
        setOrder([
          ...order,
          {
            ...formData,
            id: order.length ? order[order.length - 1].id + 1 : 1,
          },
        ]);
      }
      setFormData({
        id: null,
        full_name: "",
        email: "",
        address: "",
        city: "",
        payment_method: "",
        id_paket: "",
        order_date: "",
      });
    };
  
    // Handle edit data
    const handleEdit = (data) => {
      setFormData(data);
      setIsEditing(true);
    };
  
    // Handle delete data
    const handleDelete = (id) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        setOrder(order.filter((item) => item.id !== id));
      }
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Form untuk tambah/edit pesanan */}
        <Card className="mb-6">
          <CardBody>
            <Typography variant="h5" className="font-bold mb-4">
              {isEditing ? "Edit Pesanan" : "Tambah Pesanan"}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="Kota"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="Metode Pembayaran"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              />
              <Input
                label="Paket"
                name="id_paket"
                value={formData.id_paket}
                onChange={handleChange}
              />
              <Input
                label="Tanggal"
                name="order_date"
                value={formData.order_date}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                color={isEditing ? "blue" : "green"}
                onClick={handleSubmit}
                className="rounded-md"
              >
                {isEditing ? "Update" : "Tambah"}
              </Button>
              {isEditing && (
                <Button
                  color="red"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      id: null,
                      full_name: "",
                      email: "",
                      address: "",
                      city: "",
                      payment_method: "",
                      id_paket: "",
                      order_date: "",
                    });
                  }}
                  className="rounded-md"
                >
                  Batal
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
  
        {/* Daftar Pesanan */}
        <Card>
          <CardBody>
            <Typography variant="h5" className="font-bold mb-4">
              Daftar Pesanan
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    {["Nama", "Email", "Alamat", "Kota", "Metode Pembayaran", "Paket", "Tanggal", "Aksi"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-gray-300 py-3 px-5 text-left text-gray-600 font-semibold text-sm"
                        >
                          {el}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {order.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border-b border-gray-300 py-3 px-5">{item.full_name}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.email}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.address}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.city}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.payment_method}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.id_paket}</td>
                      <td className="border-b border-gray-300 py-3 px-5">{item.order_date}</td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            color="green"
                            onClick={() => handleEdit(item)}
                            className="rounded-md"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="red"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-md"
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default Pesanan;
  