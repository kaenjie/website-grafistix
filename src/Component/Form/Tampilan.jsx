import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaBoxOpen } from "react-icons/fa";

const Tampilan = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    city: "",
    package_id: "",
    payment_method: "",
    hasPaid: false,
  });

  const [packageCategory, setPackageCategory] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // For success or error types

  const fetchAllPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/package-categories`);
      setPackageCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.hasPaid) {
      setAlertMessage("Harap konfirmasi bahwa Anda telah melakukan pembayaran.");
      setAlertType("error");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setAlertMessage("Checkout berhasil! Terima kasih atas pemesanan Anda.");
        setAlertType("success");
        setFormData({
          full_name: "",
          email: "",
          address: "",
          city: "",
          package_id: "",
          payment_method: "",
          hasPaid: false,
        });
      } else {
        const errorData = await response.json();
        setAlertMessage("Terjadi kesalahan: " + errorData.message);
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Terjadi kesalahan jaringan: " + error.message);
      setAlertType("error");
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  const eWalletNumber = "083112080715 (REFA SETYAGAMA ABDILLAH)";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-990 to-blue-990 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pemesanan Paket Desain Grafis
        </h2>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`mb-4 p-4 rounded-md text-center ${
              alertType === "success"
                ? "bg-green-100 text-green-800"
                : alertType === "error"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div className="relative">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="flex items-center mt-1">
              <FaUser className="text-gray-400 absolute left-3" />
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <div className="flex items-center mt-1">
              <FaEnvelope className="text-gray-400 absolute left-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300"
                placeholder="Masukkan alamat email"
              />
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <div className="flex items-center mt-1">
              <FaMapMarkerAlt className="text-gray-400 absolute left-3" />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300"
                placeholder="Masukkan alamat"
              />
            </div>
          </div>

          {/* City and Package */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Kota
              </label>
              <div className="flex items-center mt-1">
                <FaCity className="text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="pl-10 w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300"
                  placeholder="Masukkan nama kota"
                />
              </div>
            </div>

            {/* Paket */}
            <div className="relative">
              <label htmlFor="paket" className="block text-sm font-medium text-gray-700">
                Paket
              </label>
              <div className="flex items-center mt-1">
                <FaBoxOpen className="text-gray-400 absolute left-3" />
                <select
                  id="paket"
                  name="package_id"
                  value={formData.package_id}
                  onChange={handleInputChange}
                  required
                  className="pl-10 w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300"
                >
                  <option value="" disabled>Pilih paket</option>
                  {packageCategory.map((paket) => (
                    <option key={paket.id} value={paket.id}>
                      {paket.name} - Rp {paket.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Metode Pembayaran
            </label>
            <div className="mt-2 space-y-4">
              {["OVO", "DANA", "ShopeePay"].map((method) => (
                <div className="flex items-center" key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="payment_method"
                    value={method}
                    checked={formData.payment_method === method}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500 transition-all duration-300"
                  />
                  <label htmlFor={method} className="ml-3 text-sm font-medium text-gray-700">
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Display Payment Number */}
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-lg text-gray-800">Silakan transfer pembayaran ke nomor e-wallet berikut:</p>
            <p className="text-lg font-semibold text-purple-600">{eWalletNumber}</p>
          </div>

          {/* Confirmation Checkbox */}
          <div>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="hasPaid"
                checked={formData.hasPaid}
                onChange={handleInputChange}
                className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition-all duration-300"
              />
              <span className="ml-2">Saya telah melakukan pembayaran ke nomor di atas.</span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md bg-purple-600 text-white font-medium text-lg shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
            >
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tampilan;
