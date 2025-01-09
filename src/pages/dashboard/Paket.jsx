import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function Paket() {
  const [paket, setPaket] = useState([
    {
      id: 1,
      name: "Paket A",
      description: "Paket A menyediakan layanan web development.",
      price: "500000",
      is_active: true,
    },
    {
      id: 2,
      name: "Paket B",
      description: "Paket B menyediakan layanan mobile app development.",
      price: "750000",
      is_active: false,
    },
    {
      id: 3,
      name: "Paket C",
      description: "Paket C menawarkan desain grafis dan branding.",
      price: "300000",
      is_active: true,
    },
  ]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle add or update data
  const handleSubmit = () => {
    if (isEditing) {
      setPaket(
        paket.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
      setIsEditing(false);
    } else {
      setPaket([
        ...paket,
        {
          ...formData,
          id: paket.length ? paket[paket.length - 1].id + 1 : 1,
        },
      ]);
    }
    setFormData({
      id: null,
      name: "",
      description: "",
      price: "",
      is_active: true,
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
      setPaket(paket.filter((item) => item.id !== id));
    }
  };

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
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
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
                {paket.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.name}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.description}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.price}
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Paket;
