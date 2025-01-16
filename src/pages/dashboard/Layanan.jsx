import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    deskripsi: "",
    poto_1: null,
    poto_2: null,
    poto_1Preview: "",
    poto_2Preview: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from API
  const fetchAllLayanan = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/titles`);
      setLayanan(response.data.data);
    } catch (error) {
      console.error("Error fetching layanan:", error);
    }
  };

  // Submit layanan
  const handleSubmitLayanan = async () => {
    // Check if all fields and photos are valid
    if (!formData.name || !formData.deskripsi) {
      Swal.fire("Gagal", "Harap lengkapi semua kolom.", "error");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("deskripsi", formData.deskripsi);

    // Only add photo if there is a change
    if (formData.poto_1) {
      formDataToSubmit.append("poto_1", formData.poto_1);
    }
    if (formData.poto_2) {
      formDataToSubmit.append("poto_2", formData.poto_2);
    }

    try {
      if (isEditing) {
        formDataToSubmit.append("_method", "PUT");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/titles/${formData.id}`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        Swal.fire("Sukses", "Layanan berhasil diupdate!", "success");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/titles`, formDataToSubmit, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Sukses", "Layanan berhasil ditambahkan!", "success");
      }
      fetchAllLayanan();
      setIsEditing(false);
      setFormData({
        id: null,
        name: "",
        deskripsi: "",
        poto_1: null,
        poto_2: null,
        poto_1Preview: "",
        poto_2Preview: "",
      });
    } catch (error) {
      console.error("Error submitting layanan:", error);
      Swal.fire("Gagal", "Gagal mengirim layanan", "error");
    }
  };

  // Handle file change
  const handleFileChange = (e, field) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [field]: files[0],
        [`${field}Preview`]: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [field]: null,
        [`${field}Preview`]: formData[`${field}Preview`],
      });
    }
  };

  // Edit data
  const handleEdit = (data) => {
    setFormData({
      ...data,
      poto_1: null,
      poto_2: null,
      poto_1Preview: `${import.meta.env.VITE_URL}storage/title/${data.poto_1}`,
      poto_2Preview: `${import.meta.env.VITE_URL}storage/title/${data.poto_2}`,
    });
    setIsEditing(true);
  };

  // Delete Layanan
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Layanan ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/titles/${id}`);
        Swal.fire("Sukses", "Layanan berhasil dihapus.", "success");
        fetchAllLayanan();
      } catch (error) {
        console.error("Error deleting layanan:", error);
        Swal.fire("Gagal", "Gagal menghapus layanan.", "error");
      }
    }
  };

  useEffect(() => {
    fetchAllLayanan();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form Layanan */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            {isEditing ? "Edit Layanan" : "Tambah Layanan"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            />
            <Input
              type="file"
              name="poto_1"
              onChange={(e) => handleFileChange(e, "poto_1")}
            />
            {formData.poto_1Preview && (
              <img
                src={formData.poto_1Preview}
                alt="Preview Foto 1"
                className="h-20 w-20 rounded-md"
              />
            )}
            <Input
              type="file"
              name="poto_2"
              onChange={(e) => handleFileChange(e, "poto_2")}
            />
            {formData.poto_2Preview && (
              <img
                src={formData.poto_2Preview}
                alt="Preview Foto 2"
                className="h-20 w-20 rounded-md"
              />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={handleSubmitLayanan}
              className={`rounded-md ${isEditing ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
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
                    deskripsi: "",
                    poto_1: null,
                    poto_2: null,
                    poto_1Preview: "",
                    poto_2Preview: "",
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

      {/* Tabel */}
      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Layanan
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  {["Nama", "Deskripsi", "Foto 1", "Foto 2", "Aksi"].map((el) => (
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
                {layanan.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-3 px-5">{item.name}</td>
                    <td className="border-b border-gray-300 py-3 px-5">{item.deskripsi}</td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      <img
                        src={`${import.meta.env.VITE_URL}storage/title/${item.poto_1}`}
                        alt="Foto 1"
                        className="h-16 w-16 rounded-md"
                      />
                    </td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      <img
                        src={`${import.meta.env.VITE_URL}storage/title/${item.poto_2}`}
                        alt="Foto 2"
                        className="h-16 w-16 rounded-md"
                      />
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

export default Layanan;
