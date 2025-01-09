import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import React, { useState } from "react";

/*************  ✨ FAQ Component ⭐  *************/
/**
 * FAQ component
 *
 * This component is used to display a list of frequently asked questions (FAQs) and allow
 * the user to add, edit, or delete FAQs.
 *
 * @returns {ReactElement} The FAQ component
 */

export function Faq() {
    const [faqs, setFaqs] = useState([
        {
            id: 1,
            pertanyaan: "Apa itu layanan kami?",
            jawaban: "Layanan kami menawarkan solusi teknologi untuk kebutuhan bisnis.",
        },
        {
            id: 2,
            pertanyaan: "Bagaimana cara mendaftar?",
            jawaban: "Anda bisa mendaftar melalui halaman pendaftaran di situs web kami.",
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        pertanyaan: "",
        jawaban: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle add or update FAQ data
    const handleSubmit = () => {
        if (isEditing) {
            setFaqs(
                faqs.map((item) =>
                    item.id === formData.id
                        ? { ...formData }
                        : item
                )
            );
            setIsEditing(false);
        } else {
            setFaqs([
                ...faqs,
                {
                    ...formData,
                    id: faqs.length ? faqs[faqs.length - 1].id + 1 : 1,
                },
            ]);
        }
        setFormData({
            id: null,
            pertanyaan: "",
            jawaban: "",
        });
    };

    // Handle edit FAQ data
    const handleEdit = (data) => {
        setFormData({ ...data });
        setIsEditing(true);
    };

    // Handle delete FAQ data
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
            setFaqs(faqs.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Card className="mb-6">
                <CardBody>
                    <Typography variant="h5" className="font-bold mb-4">
                        {isEditing ? "Edit FAQ" : "Tambah FAQ"}
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Pertanyaan"
                            name="pertanyaan"
                            value={formData.pertanyaan}
                            onChange={handleChange}
                        />
                        <Input
                            label="Jawaban"
                            name="jawaban"
                            value={formData.jawaban}
                            onChange={handleChange}
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
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        id: null,
                                        pertanyaan: "",
                                        jawaban: "",
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
                        Daftar FAQ
                    </Typography>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    {["Pertanyaan", "Jawaban", "Aksi"].map((el) => (
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
                                {faqs.map((item) => {
                                    return (
                                        <tr key={item.id} className="hover:bg-gray-100">
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.pertanyaan}
                                            </td>
                                            <td className="border-b border-gray-300 py-3 px-5">
                                                {item.jawaban}
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

export default Faq;
