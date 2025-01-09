import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function Testimoni() {
    const [testimoni, setTestimoni] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        company: "",
        role: "",
        feedback: "",
        image: null,
        imagePreview: "",
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

    // Handle input changes for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle file change (for image)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    // Submit form data (Create/Update)
    const handleSubmitTestimoni = async () => {
        if (!formData.name && !formData.company && !formData.role && !formData.feedback && !formData.image) {
            alert("Harap lengkapi minimal satu kolom.");
            return;
        }

        const formDataToSubmit = new FormData();

        // Append only the fields that have been changed
        if (formData.name) formDataToSubmit.append("name", formData.name);
        if (formData.company) formDataToSubmit.append("company", formData.company);
        if (formData.role) formDataToSubmit.append("role", formData.role);
        if (formData.feedback) formDataToSubmit.append("feedback", formData.feedback);
        if (formData.image) formDataToSubmit.append("image", formData.image);

        // Add _method field to indicate PUT for update
        if (isEditing) {
            formDataToSubmit.append("_method", "PUT");
        }

        try {
            if (isEditing) {
                // Update existing testimoni using POST with _method as PUT
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/testimonis/${formData.id}`,
                    formDataToSubmit,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                alert("Testimoni berhasil diperbarui");
            } else {
                // Create new testimoni
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/testimonis`,
                    formDataToSubmit,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
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
            alert("Gagal mengirim testimoni");
        }
    };

    // Handle edit functionality (Populate form with existing data)
    const handleEdit = (item) => {
        setIsEditing(true);
        setFormData({
            id: item.id,
            name: item.name,
            company: item.company,
            role: item.role,
            feedback: item.feedback,
            image: null,
            imagePreview: item.image, // assuming image URL is stored in 'image'
        });
    };

    // Handle delete functionality
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/testimonis/${id}`);
                setTestimoni(testimoni.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting testimoni:", error);
                alert("Gagal menghapus testimoni");
            }
        }
    };

    useEffect(() => {
        fetchAllTestimoni();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
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
                            onChange={handleChange}
                            disabled={isEditing && !formData.name}
                        />
                        <Input
                            label="Instansi"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={isEditing && !formData.company}
                        />
                        <Input
                            label="Peran"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled={isEditing && !formData.role}
                        />
                        <Input
                            label="Pesan"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                        />
                        <Input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
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
                            color={isEditing ? "blue" : "green"}
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
                                                src={item.image}
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
