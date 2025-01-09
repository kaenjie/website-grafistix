import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";

export function Layanan() {
  const [layanan, setLayanan] = useState([
    {
      id: 1,
      name: "Layanan Web Development",
      deskripsi: "Membangun website profesional dengan desain modern.",
      poto_1: "web1.jpg",
      poto_2: "web2.jpg",
    },
    {
      id: 2,
      name: "Layanan Mobile App",
      deskripsi: "Pengembangan aplikasi mobile untuk iOS dan Android.",
      poto_1: "mobile1.jpg",
      poto_2: "mobile2.jpg",
    },
  ]);

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
        [`${name}Preview`]: URL.createObjectURL(files[0]),
      });
    }
  };

  // Handle add or update data
  const handleSubmit = () => {
    if (isEditing) {
      setLayanan(
        layanan.map((item) =>
          item.id === formData.id
            ? { ...formData, poto_1: formData.poto_1Preview, poto_2: formData.poto_2Preview }
            : item
        )
      );
      setIsEditing(false);
    } else {
      setLayanan([
        ...layanan,
        {
          ...formData,
          id: layanan.length ? layanan[layanan.length - 1].id + 1 : 1,
          poto_1: formData.poto_1Preview,
          poto_2: formData.poto_2Preview,
        },
      ]);
    }
    setFormData({
      id: null,
      name: "",
      deskripsi: "",
      poto_1: null,
      poto_2: null,
      poto_1Preview: "",
      poto_2Preview: "",
    });
  };

  // Handle edit data
  const handleEdit = (data) => {
    setFormData({
      ...data,
      poto_1: null,
      poto_2: null,
      poto_1Preview: data.poto_1,
      poto_2Preview: data.poto_2,
    });
    setIsEditing(true);
  };

  // Handle delete data
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setLayanan(layanan.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
              onChange={handleChange}
            />
            <Input
              label="Deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
            />
            <Input
              type="file"
              name="poto_1"
              onChange={handleFileChange}
            />
            {formData.poto_1Preview && (
              <img
                src={formData.poto_1Preview}
                alt="Preview"
                className="h-20 w-20 rounded-md"
              />
            )}
            <Input
              type="file"
              name="poto_2"
              onChange={handleFileChange}
            />
            {formData.poto_2Preview && (
              <img
                src={formData.poto_2Preview}
                alt="Preview"
                className="h-20 w-20 rounded-md"
              />
            )}
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

      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Layanan
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  {["Nama", "Deskripsi", "Foto 1", "Foto 2", "Aksi"].map(
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
                {layanan.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.name}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        {item.deskripsi}
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        <img
                          src={item.poto_1}
                          alt="Foto 1"
                          className="h-16 w-16 rounded-md"
                        />
                      </td>
                      <td className="border-b border-gray-300 py-3 px-5">
                        <img
                          src={item.poto_2}
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

export default Layanan;
