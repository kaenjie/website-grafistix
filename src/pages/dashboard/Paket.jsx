import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function Paket() {
  const [paket, setPaket] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data paket
  const fetchAllPaket = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
      setPaket(response.data.data);
    } catch (error) {
      console.error("Error fetching paket:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,  // Handle checkbox separately
    });
  };

  // Handle add or update paket
  const handleSubmit = async () => {
    // Cek apakah semua kolom valid
    if (!formData.name || !formData.description || !formData.price) {
      alert("Harap lengkapi semua kolom.");
      return;
    }

    const dataToSubmit = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      is_active: formData.is_active,
    };

    try {
      if (isEditing) {
        // Jika edit, lakukan PUT request
        await axios.put(
          `${import.meta.env.VITE_API_URL}/packages/${formData.id}`,
          dataToSubmit
        );
      } else {
        // Jika tambah, lakukan POST request
        await axios.post(`${import.meta.env.VITE_API_URL}/packages`, dataToSubmit);
      }

      // Refetch data setelah berhasil submit
      fetchAllPaket();
      setFormData({
        id: null,
        name: "",
        description: "",
        price: "",
        is_active: true,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting paket:", error);
    }
  };

  // Handle edit paket
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // Handle delete paket
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/packages/${id}`);
        fetchAllPaket();
      } catch (error) {
        console.error("Error deleting paket:", error);
      }
    }
  };

  // Fetch paket data on component mount
  useEffect(() => {
    fetchAllPaket();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form untuk tambah/edit paket */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            {isEditing ? "Edit Paket" : "Tambah Paket"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama Paket"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              label="Harga"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="ml-2">Aktif</label>
            </div>
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
                    name: "",
                    description: "",
                    price: "",
                    is_active: true,
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

      {/* Daftar Paket */}
      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Paket
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  {["Nama Paket", "Deskripsi", "Harga", "Status", "Aksi"].map(
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
                {paket.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-3 px-5">{item.name}</td>
                    <td className="border-b border-gray-300 py-3 px-5">{item.description}</td>
                    <td className="border-b border-gray-300 py-3 px-5">{item.price}</td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.is_active ? "Aktif" : "Tidak Aktif"}
                    </td>
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

export default Paket;
