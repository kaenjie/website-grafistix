import { Card, CardBody, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export function Portofolio() {
  const [portofolio, setPortofolio] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title_id: "",
    description: "",
    file_path: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all portofolio
  const fetchAllPortofolio = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/photos`);
      setPortofolio(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllPortofolio();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file_path: e.target.files[0] });
  };

  // Handle add or update data
  const handleSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title_id", formData.title_id);
      if (formData.file_path) {
        formDataToSubmit.append("file_path", formData.file_path);
      }

      if (isEditing) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/portfolios/${formData.id}`,
          formDataToSubmit,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/portfolios`, formDataToSubmit, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchAllPortofolio();  // Fetch updated data
      resetForm();  // Reset the form after submit
    } catch (error) {
      console.log(error);
    }
  };

  // Handle edit data
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      title_id: item.title_id,
      file_path: { name: item.file_path },
    });
    setIsEditing(true);
  };

  // Handle delete data
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/portfolios/${id}`);
        fetchAllPortofolio(); // Fetch updated data after delete
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: null, title_id: "", description: "", file_path: null });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form Tambah/Edit */}
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            {isEditing ? "Edit Portofolio" : "Tambah Portofolio"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ID Layanan"
              name="title_id"
              value={formData.title_id}
              onChange={handleChange}
            />
            <Input
              type="file"
              label="Upload Gambar"
              onChange={handleFileChange}
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
                onClick={resetForm}
                className="rounded-md"
              >
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Daftar Portofolio */}
      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Portofolio
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  {["ID Layanan", "File Path", "Aksi"].map((el) => (
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
                {portofolio.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.title_id}
                    </td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.file_path}
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

export default Portofolio;
