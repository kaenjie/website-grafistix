import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all FAQs from the API
  const fetchAllFaqs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/faqs`);
      setFaqs(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchAllFaqs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update FAQ
  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      Swal.fire("Gagal", "Harap lengkapi pertanyaan dan jawaban.", "error");
      return;
    }

    const dataToSubmit = {
      question: formData.question,
      answer: formData.answer,
    };

    try {
      if (isEditing) {
        // Update FAQ using PUT request
        await axios.put(
          `${import.meta.env.VITE_API_URL}/faqs/${formData.id}`,
          dataToSubmit
        );
      } else {
        // Add new FAQ using POST request
        await axios.post(`${import.meta.env.VITE_API_URL}/faqs`, dataToSubmit);
      }

      setIsEditing(false);
      setFormData({ id: null, question: "", answer: "" });
      fetchAllFaqs();
      Swal.fire("Sukses", isEditing ? "FAQ berhasil diperbarui" : "FAQ berhasil ditambahkan", "success");
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      Swal.fire("Gagal", "Gagal mengirim FAQ", "error");
    }
  };

  // Edit FAQ
  const handleEdit = (faq) => {
    setFormData({ id: faq.id, question: faq.question, answer: faq.answer });
    setIsEditing(true);
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/faqs/${id}`);
        fetchAllFaqs();
        Swal.fire("Sukses", "FAQ berhasil dihapus", "success");
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        Swal.fire("Gagal", "Gagal menghapus FAQ", "error");
      }
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
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
            <Input
              label="Jawaban"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              color={isEditing ? "blue" : "black"}
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
                  setFormData({ id: null, question: "", answer: "" });
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
                {faqs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.question}
                    </td>
                    <td className="border-b border-gray-300 py-3 px-5">
                      {item.answer}
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

export default Faq;
