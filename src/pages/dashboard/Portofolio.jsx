import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";  // Import SweetAlert2

export function Portofolio() {
  const [photos, setPhotos] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    title_id: "",
    file_path: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch data portofolio
  const fetchAllPhotos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/photos`);
      setPhotos(response.data.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  // Tambah/Update Photos
  const handleSubmitPhotos = async () => {
    if (!formData.title_id || !formData.file_path) {
      alert("Harap lengkapi ID Layanan dan pilih file.");
      return;
    }
  
    const formDataToSubmit = new FormData();
    if (formData.title_id) {
      formDataToSubmit.append("title_id", formData.title_id);
    }
    if (formData.file_path && formData.file_path instanceof File) {
      formDataToSubmit.append("file_path", formData.file_path);
    }    
    
    try {
      if (isEditing) {
        formDataToSubmit.append("_method", "PUT");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/photos/${formData.id}`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        Swal.fire("Sukses", "Portofolio berhasil diperbarui!", "success");  // Success message on update
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/photos`, formDataToSubmit, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Sukses", "Portofolio berhasil ditambahkan!", "success");  // Success message on add
      }
      fetchAllPhotos();
      setIsEditing(false);
      setFormData({
        id: null,
        title_id: "",
        file_path: null,
      });
    } catch (error) {
      console.error("Error submitting photo:", error.response?.data || error.message);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan portofolio.", "error");
    }
  };

  // Hapus Photo
  const handleDeletePhoto = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/photos/${id}`);
        fetchAllPhotos();
        Swal.fire("Sukses", "Portofolio berhasil dihapus!", "success");  // Success message on delete
      } catch (error) {
        console.error("Error deleting photo:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus portofolio.", "error");
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      title_id: "",
      file_path: null,
    });
  };

  useEffect(() => {
    fetchAllPhotos();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form Portofolio */}
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
              onChange={(e) => setFormData({ ...formData, title_id: e.target.value })}
            />
            <Input
              type="file"
              name="file_path"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
                  if (!allowedTypes.includes(file.type)) {
                    alert("Hanya file dengan tipe jpeg, png, jpg, gif yang diperbolehkan.");
                    return;
                  }

                  setFormData({
                    ...formData,
                    file_path: file,
                    filepreview: URL.createObjectURL(file),
                  });
                }
              }}
            />
            {!formData.filepreview && isEditing && (
              <img
                src={`${formData.file_path}`}
                alt="Preview Lama"
                className="w-1/2"
              />
            )}
            {formData.filepreview && (
              <img
                src={formData.filepreview}
                alt="Preview Baru"
                className="w-1/2"
              />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={handleSubmitPhotos}
              className={`${
                isEditing ? "bg-blue-500" : "bg-black"
              } text-white rounded-md`}
            >
              {isEditing ? "Update" : "Tambah"}
            </Button>
            {isEditing && (
              <Button
                onClick={handleCancelEdit}
                className="bg-red-500 text-white rounded-md"
              >
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Photos List */}
      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Portofolio
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  {["ID Layanan", "File", "Aksi"].map((el) => (
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
                {photos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.title_id}
                    </td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      <img src={`${item.file_path}`} alt="File" className="h-16 w-16 object-cover"/>
                    </td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => {
                            setIsEditing(true);
                            setFormData(item);
                          }}
                          className="rounded-md"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="red"
                          onClick={() => handleDeletePhoto(item.id)}
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