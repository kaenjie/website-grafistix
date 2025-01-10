import { Card, CardBody, Typography, Button, Input, Switch } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function Paket() {
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);

  const [formDataCategory, setFormDataCategory] = useState({
    name: "",
    price: "",
  });
  const [formDataOption, setFormDataOption] = useState({
    name: "",
    status: false,
    package_id: "",
  });
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingOption, setIsEditingOption] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/package-categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch options
  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/option-packages`);
      setOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchOptions();
  }, []);

  // Handle category form changes
  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setFormDataCategory({
      ...formDataCategory,
      [name]: value,
    });
  };

  // Handle option form changes
  const handleChangeOption = (e) => {
    const { name, value } = e.target;
    setFormDataOption({
      ...formDataOption,
      [name]: name === "status" ? e.target.checked : value,
    });
  };

  // Submit category
  const handleSubmitCategory = async () => {
    if (!formDataCategory.name || !formDataCategory.price) {
      alert("Harap lengkapi semua kolom.");
      return;
    }
    try {
      if (isEditingCategory) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/package-categories/${formDataCategory.id}`,
          formDataCategory
        );
        Swal.fire("Sukses", "Kategori berhasil diperbarui!", "success");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/package-categories`, formDataCategory);
        Swal.fire("Sukses", "Kategori berhasil ditambahkan!", "success");
      }
      fetchCategories();
      resetFormCategory();
    } catch (error) {
      console.error("Error submitting kategori:", error);
    }
  };

  // Submit option
  const handleSubmitOption = async () => {
    if (!formDataOption.name || !formDataOption.package_id) {
      alert("Harap lengkapi semua kolom.");
      return;
    }
    try {
      if (isEditingOption) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/option-packages/${formDataOption.id}`,
          formDataOption
        );
        Swal.fire("Sukses", "Opsi berhasil diperbarui!", "success");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/option-packages`, formDataOption);
        Swal.fire("Sukses", "Opsi berhasil ditambahkan!", "success");
      }
      fetchOptions();
      resetFormOption();
    } catch (error) {
      console.error("Error submitting opsi:", error);
    }
  };

  // Edit category
  const handleEditCategory = (item) => {
    setFormDataCategory(item);
    setIsEditingCategory(true);
  };

  // Edit option
  const handleEditOption = (item) => {
    setFormDataOption({
      ...item,
      status: !!item.status,
    });
    setIsEditingOption(true);
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/package-categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting kategori:", error);
      }
    }
  };

  // Delete option
  const handleDeleteOption = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus opsi ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/option-packages/${id}`);
        fetchOptions();
      } catch (error) {
        console.error("Error deleting opsi:", error);
      }
    }
  };

  // Reset forms
  const resetFormCategory = () => {
    setFormDataCategory({ name: "", price: "" });
    setIsEditingCategory(false);
  };

  const resetFormOption = () => {
    setFormDataOption({ name: "", status: false, package_id: "" });
    setIsEditingOption(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            {isEditingCategory ? "Edit Kategori" : "Tambah Kategori"}
          </Typography>
          <Input
            label="Nama Kategori"
            name="name"
            value={formDataCategory.name}
            onChange={handleChangeCategory}
          />
          <Input
            label="Harga Kategori"
            name="price"
            type="number"
            value={formDataCategory.price}
            onChange={handleChangeCategory}
            className="mt-4"
          />
          <Button
            color={isEditingCategory ? "blue" : "green"}
            onClick={handleSubmitCategory}
            className="mt-4"
          >
            {isEditingCategory ? "Update" : "Tambah"}
          </Button>
          {isEditingCategory && (
            <Button color="red" onClick={resetFormCategory} className="ml-4 mt-4">
              Batal
            </Button>
          )}
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Kategori
          </Typography>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-5">Nama</th>
                <th className="border-b py-3 px-5">Harga</th>
                <th className="border-b py-3 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="border-b py-3 px-5">{cat.name}</td>
                  <td className="border-b py-3 px-5">{cat.price}</td>
                  <td className="border-b py-3 px-5">
                    <Button
                      size="sm"
                      color="blue"
                      onClick={() => handleEditCategory(cat)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleDeleteCategory(cat.id)}
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

      <Card className="mb-6">
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            {isEditingOption ? "Edit Opsi" : "Tambah Opsi"}
          </Typography>
          <Input
            label="Nama Opsi"
            name="name"
            value={formDataOption.name}
            onChange={handleChangeOption}
          />
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Kategori</label>
            <select
              name="package_id"
              value={formDataOption.package_id}
              onChange={handleChangeOption}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <Switch
              label="Status"
              checked={formDataOption.status}
              name="status"
              onChange={handleChangeOption}
            />
          </div>
          <Button
            color={isEditingOption ? "blue" : "green"}
            onClick={handleSubmitOption}
            className="mt-4"
          >
            {isEditingOption ? "Update" : "Tambah"}
          </Button>
          {isEditingOption && (
            <Button color="red" onClick={resetFormOption} className="ml-4 mt-4">
              Batal
            </Button>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h5" className="font-bold mb-4">
            Daftar Opsi
          </Typography>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-5">Nama</th>
                <th className="border-b py-3 px-5">Kategori</th>
                <th className="border-b py-3 px-5">Status</th>
                <th className="border-b py-3 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {options.map((opt) => (
                <tr key={opt.id}>
                  <td className="border-b py-3 px-5">{opt.name}</td>
                  <td className="border-b py-3 px-5">{opt.category?.name || "-"}</td>
                  <td className="border-b py-3 px-5">
                    {opt.status ? "Aktif" : "Nonaktif"}
                  </td>
                  <td className="border-b py-3 px-5">
                    <Button
                      size="sm"
                      color="blue"
                      onClick={() => handleEditOption(opt)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleDeleteOption(opt.id)}
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

export default Paket;
