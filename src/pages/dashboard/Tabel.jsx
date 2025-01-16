import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function Tabel() {
  const [tentang, setTentang] = useState([]);
  const [banner, setBanner] = useState([]);

  const [formDataTentang, setFormDataTentang] = useState({
    id: null,
    judul: "",
    deskripsi: "",
    image: null,
    filePreview: "",
  });

  const [formDataBanner, setFormDataBanner] = useState({
    id: null,
    file: null,
    filePreview: "",
  });

  const [isEditingTentang, setIsEditingTentang] = useState(false);
  const [isEditingBanner, setIsEditingBanner] = useState(false);

  // Fetch data Tentang Kami
  const fetchAllTentang = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/abouts`);
      setTentang(response.data.data);
    } catch (error) {
      console.error("Error fetching Tentang Kami:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat memuat data tentang kami.", "error");
    }
  };

  // Fetch data Banner
  const fetchAllBanner = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/banners`);
      setBanner(response.data.data);
    } catch (error) {
      console.error("Error fetching Banner:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat memuat data banner.", "error");
    }
  };

  // Tambah/Update Tentang Kami
  const handleSubmitTentang = async () => {
    const formData = new FormData();
    if (formDataTentang.judul) {
      formData.append("judul", formDataTentang.judul);
    }
    if (formDataTentang.deskripsi) {
      formData.append("deskripsi", formDataTentang.deskripsi);
    }
    if (formDataTentang.judul && formDataTentang.deskripsi && formDataTentang.image instanceof File) {
      formData.append("image", formDataTentang.image);
    }

    try {
      if (isEditingTentang) {
        formData.append("_method", "PUT");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/abouts/${formDataTentang.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/abouts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchAllTentang();
      setIsEditingTentang(false);
      setFormDataTentang({
        id: null,
        judul: "",
        deskripsi: "",
        image: null,
        filePreview: "",
      });
      Swal.fire("Sukses", "Data tentang kami berhasil disimpan.", "success");
    } catch (error) {
      console.error("Error submitting Tentang Kami:", error);
      Swal.fire("Gagal", "Gagal mengirim tentang kami", "error");
    }
  };

  // Tambah/Update Banner
  const handleSubmitBanner = async () => {
    const formData = new FormData();
    formData.append("file", formDataBanner.file);

    try {
      if (isEditingBanner) {
        formData.append("_method", "PUT");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/banners/${formDataBanner.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/banners`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchAllBanner();
      setIsEditingBanner(false);
      setFormDataBanner({
        id: null,
        file: null,
        filePreview: "",
      });
      Swal.fire("Sukses", "Data banner berhasil disimpan.", "success");
    } catch (error) {
      console.error("Error submitting Banner:", error);
      Swal.fire("Gagal", "Gagal mengirim banner", "error");
    }
  };

  // Hapus Tentang Kami
  const handleDeleteTentangKami = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/abouts/${id}`);
        fetchAllTentang();
        Swal.fire("Sukses", "Data tentang kami berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting Tentang Kami:", error);
        Swal.fire("Gagal", "Gagal menghapus data tentang kami", "error");
      }
    }
  };

  // Hapus Banner
  const handleDeleteBanner = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/banners/${id}`);
        fetchAllBanner();
        Swal.fire("Sukses", "Data banner berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting Banner:", error);
        Swal.fire("Gagal", "Gagal menghapus data banner", "error");
      }
    }
  };

  // Reset form when cancelling
  const handleCancelTentang = () => {
    setIsEditingTentang(false);
    setFormDataTentang({
      id: null,
      judul: "",
      deskripsi: "",
      image: null,
      filePreview: "",
    });
  };

  const handleCancelBanner = () => {
    setIsEditingBanner(false);
    setFormDataBanner({
      id: null,
      file: null,
      filePreview: "",
    });
  };

  useEffect(() => {
    fetchAllTentang();
    fetchAllBanner();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* Tentang Kami Form */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4">
            {isEditingTentang ? "Edit Tentang Kami" : "Tambah Tentang Kami"}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Judul"
              name="judul"
              value={formDataTentang.judul}
              onChange={(e) =>
                setFormDataTentang({ ...formDataTentang, judul: e.target.value })
              }
            />
            <Input
              label="Deskripsi"
              name="deskripsi"
              value={formDataTentang.deskripsi}
              onChange={(e) =>
                setFormDataTentang({
                  ...formDataTentang,
                  deskripsi: e.target.value,
                })
              }
            />
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setFormDataTentang({
                  ...formDataTentang,
                  image: e.target.files[0],
                  filePreview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            {formDataTentang.filePreview && (
              <img
                src={formDataTentang.filePreview}
                alt="Preview"
                className="h-20 w-20 object-cover"
              />
            )}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Button 
              onClick={handleSubmitTentang} 
              className={`text-white ${isEditingTentang ? "bg-blue-500" : "bg-black"}`}
            >
              {isEditingTentang ? "Update" : "Tambah"}
            </Button>
            {isEditingTentang && (
              <Button onClick={handleCancelTentang} className="bg-red-500 text-white">
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Tentang Kami Table */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4">Daftar Tentang Kami</Typography>
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left">Judul</th>
                <th className="p-4 text-left">Deskripsi</th>
                <th className="p-4 text-left">Gambar</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tentang.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-100">
                  <td className="p-4">{item.judul}</td>
                  <td className="p-4">{item.deskripsi}</td>
                  <td className="p-4">
                    <img
                      src={`${import.meta.env.VITE_URL}storage/about/${item.image}`}
                      alt="Gambar"
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <Button
                      onClick={() => {
                        setIsEditingTentang(true);
                        setFormDataTentang(item);
                      }}
                      className="bg-green-500 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDeleteTentangKami(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Banner Form */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4">
            {isEditingBanner ? "Edit Banner" : "Tambah Banner"}
          </Typography>
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="file"
              name="file"
              onChange={(e) =>
                setFormDataBanner({
                  ...formDataBanner,
                  file: e.target.files[0],
                  filePreview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            {formDataBanner.filePreview && (
              <img
                src={formDataBanner.filePreview}
                alt="Preview"
                className="h-20 w-20 object-cover"
              />
            )}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Button 
              onClick={handleSubmitBanner} 
              className={`text-white ${isEditingBanner ? "bg-blue-500" : "bg-black"}`}
            >
              {isEditingBanner ? "Update" : "Tambah"}
            </Button>
            {isEditingBanner && (
              <Button onClick={handleCancelBanner} className="bg-red-500 text-white">
                Batal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Banner Table */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4">Daftar Banner</Typography>
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left">Gambar</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {banner.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-100">
                  <td className="p-4">
                    <img
                      src={`${import.meta.env.VITE_URL}storage/banners/${item.file}`}
                      alt="Banner"
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="p-4 flex gap-2 justify-start">
                    <Button
                      onClick={() => {
                        setIsEditingBanner(true);
                        setFormDataBanner(item);
                      }}
                      className="bg-green-500 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDeleteBanner(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tabel;
