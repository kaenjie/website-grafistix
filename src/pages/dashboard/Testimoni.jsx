import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import Swal from "sweetalert2"; // Import Swal
  
  export function Testimoni() {
    const [testimoni, setTestimoni] = useState([]);
    const [formData, setFormData] = useState({
      id: null,
      name: "",
      company: "",
      role: "",
      feedback: "",
      image: null,
      imagePreview: "", // URL image or local preview URL
    });
    const [isEditing, setIsEditing] = useState(false);
  
    // Fetch data testimoni
    const fetchAllTestimoni = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/testimonis`);
        setTestimoni(response.data.data);
      } catch (error) {
        console.error("Error fetching testimoni:", error);
      }
    };
  
    // Submit form data (Create/Update)
    const handleSubmitTestimoni = async () => {
      if (!formData.name && !formData.company && !formData.role && !formData.feedback && !formData.image) {
        Swal.fire("Gagal", "Harap lengkapi semua kolom", "error");
        return;
      }
  
      const formDataToSubmit = new FormData();
      if (formData.name) {
        formDataToSubmit.append("name", formData.name);
      }
      if (formData.company) {
        formDataToSubmit.append("company", formData.company);
      }
      if (formData.role) {
        formDataToSubmit.append("role", formData.role);
      }
      if (formData.feedback) {
        formDataToSubmit.append("feedback", formData.feedback);
      }
      if (formData.name && formData.company && formData.role && formData.feedback && formData.image instanceof File) {
        formDataToSubmit.append("image", formData.image);
      }
  
      try {
        if (isEditing) {
          formDataToSubmit.append("_method", "PUT");
          await axios.post(
            `${import.meta.env.VITE_API_URL}/testimonis/${formData.id}`,
            formDataToSubmit,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          Swal.fire("Sukses", "Testimoni berhasil diperbarui", "success");
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/testimonis`,
            formDataToSubmit,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          Swal.fire("Sukses", "Testimoni berhasil ditambahkan", "success");
        }
        fetchAllTestimoni();
        setIsEditing(false);
        setFormData({
          id: null,
          name: "",
          company: "",
          role: "",
          feedback: "",
          image: null,
          imagePreview: "",
        });
      } catch (error) {
        console.error("Error submitting testimoni:", error);
        Swal.fire("Gagal", "Gagal mengirim testimoni", "error");
      }
    };
  
    // Handle file changes
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
        image: null,
        imagePreview: `${import.meta.env.VITE_URL}storage/testimoni/${data.image}`,
      });
      setIsEditing(true);
    };
  
    // Hapus testimoni
    const handleDelete = async (id) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/testimonis/${id}`);
          setTestimoni(testimoni.filter((item) => item.id !== id));
          Swal.fire("Sukses", "Testimoni berhasil dihapus", "success");
        } catch (error) {
          console.error("Error deleting testimoni:", error);
          Swal.fire("Gagal", "Gagal menghapus testimoni", "error");
        }
      }
    };
  
    useEffect(() => {
      fetchAllTestimoni();
    }, []);
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Form Testimoni */}
        <Card className="mb-6">
          <CardBody>
            <Typography variant="h5" className="font-bold mb-4">
              {isEditing ? "Edit Testimoni" : "Tambah Testimoni"}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Instansi"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <Input
                label="Peran"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <Input
                label="Pesan"
                name="feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              />
              <Input
                type="file"
                name="image"
                onChange={(e) => handleFileChange(e, "image")}
              />
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="h-20 w-20 rounded-md"
                />
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                color={isEditing ? "blue" : "black"}
                onClick={handleSubmitTestimoni}
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
                      company: "",
                      role: "",
                      feedback: "",
                      image: null,
                      imagePreview: "",
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
  
        {/* Daftar Testimoni */}
        <Card>
          <CardBody>
            <Typography variant="h5" className="font-bold mb-4">
              Daftar Testimoni
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    {["Nama", "Instansi", "Peran", "Pesan", "Foto", "Aksi"].map(
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
                  {testimoni.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.name}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.company}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.role}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.feedback}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        <img
                          src={`${import.meta.env.VITE_URL}storage/testimoni/${item.image}`}
                          alt="Foto Testimoni"
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
  
  export default Testimoni;
  