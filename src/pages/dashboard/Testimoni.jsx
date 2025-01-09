import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import React, { useState } from "react";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Testimoni component
 *
 * This component is used to display a list of testimonials and allow
 * the user to add, edit or delete testimonials.
 *
 * @param {object} props Component props
 * @param {object} props.testimoni List of testimonials
 * @param {function} props.setTestimoni Function to update the list of testimonials
 * @returns {ReactElement} The Testimoni component
 */

export function Testimoni() {
    const [testimoni, setTestimoni] = useState([
        {
            id: 1,
            nama: "John Doe",
            instansi: "ABC Corp",
            peran: "CEO",
            pesan: "Great service, highly recommend!",
            foto: "testimoni1.jpg",
        },
        {
            id: 2,
            nama: "Jane Smith",
            instansi: "XYZ Ltd.",
            peran: "Manager",
            pesan: "Professional and reliable.",
            foto: "testimoni2.jpg",
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        nama: "",
        instansi: "",
        peran: "",
        pesan: "",
        foto: null,
        fotoPreview: "",
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
            setTestimoni(
                testimoni.map((item) =>
                    item.id === formData.id
                        ? { ...formData, foto: formData.fotoPreview }
                        : item
                )
            );
            setIsEditing(false);
        } else {
            setTestimoni([
                ...testimoni,
                {
                    ...formData,
                    id: testimoni.length ? testimoni[testimoni.length - 1].id + 1 : 1,
                    foto: formData.fotoPreview,
                },
            ]);
        }
        setFormData({
            id: null,
            nama: "",
            instansi: "",
            peran: "",
            pesan: "",
            foto: null,
            fotoPreview: "",
        });
    };

    // Handle edit data
    const handleEdit = (data) => {
        setFormData({
            ...data,
            foto: null,
            fotoPreview: data.foto,
        });
        setIsEditing(true);
    };

    // Handle delete data
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            setTestimoni(testimoni.filter((item) => item.id !== id));
        }
    };

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
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                        />
                        <Input
                            label="Instansi"
                            name="instansi"
                            value={formData.instansi}
                            onChange={handleChange}
                        />
                        <Input
                            label="Peran"
                            name="peran"
                            value={formData.peran}
                            onChange={handleChange}
                        />
                        <Input
                            label="Pesan"
                            name="pesan"
                            value={formData.pesan}
                            onChange={handleChange}
                        />
                        <Input
                            type="file"
                            name="foto"
                            onChange={handleFileChange}
                        />
                        {formData.fotoPreview && (
                            <img
                                src={formData.fotoPreview}
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
                                        nama: "",
                                        instansi: "",
                                        peran: "",
                                        pesan: "",
                                        foto: null,
                                        fotoPreview: "",
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
                                {testimoni.map((item) => {
                                    return (
                                        <tr key={item.id} className="hover:bg-gray-100">
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.nama}
                                            </td>
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.instansi}
                                            </td>
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.peran}
                                            </td>
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.pesan}
                                            </td>
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                <img
                                                    src={item.foto}
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

export default Testimoni;
