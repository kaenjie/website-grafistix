import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function Pesanan() {
  const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    full_name: "",
    email: "",
    address: "",
    city: "",
    payment_method: "OVO", // Default to "OVO"
    package_id: "",
    order_date: new Date().toISOString().split("T")[0],
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from API
  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
      setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle add or update data
  const handleSubmit = async () => {
    // Filter out empty fields (only submit changed data)
    const dataToSubmit = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value && value !== "") {
        dataToSubmit[key] = value;
      }
    }

    if (Object.keys(dataToSubmit).length === 0) {
      alert("Harap lengkapi setidaknya satu kolom.");
      return;
    }

    try {
      if (isEditing) {
        // Use PUT request for update
        await axios.put(
          `${import.meta.env.VITE_API_URL}/orders/${formData.id}`,
          dataToSubmit
        );
      } else {
        // Use POST request for creating new order
        await axios.post(`${import.meta.env.VITE_API_URL}/orders`, dataToSubmit);
      }
      // Refetch data after successful submit
      fetchAllOrder();
      setFormData({
        id: null,
        full_name: "",
        email: "",
        address: "",
        city: "",
        payment_method: "OVO", 
        package_id: "",
        order_date: new Date().toISOString().split("T")[0], 
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  // Handle edit data
  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
  };

  // Handle delete data
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`);
        fetchAllOrder();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

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
            {/* Payment Method Select */}
            <Input
              label="Metode Pembayaran"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              disabled={isEditing}
            />
            <Input
              label="Paket"
              name="package_id"
              value={formData.package_id}
              onChange={handleChange}
              disabled={isEditing}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              color={isEditing ? "blue" : "black"}
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
                    payment_method: "OVO",
                    package_id: "",
                    order_date: new Date().toISOString().split("T")[0],
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
                  {[
                    "Nama",
                    "Email",
                    "Alamat",
                    "Kota",
                    "Metode Pembayaran",
                    "Paket",
                    "Aksi",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-gray-300 py-3 px-5 text-left text-gray-600 font-semibold text-sm"
                    >
                      {el}
                    </th>
                  ))}
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
                    <td className="border-b border-gray-300 py-3 px-5">{item.package_id}</td>
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
