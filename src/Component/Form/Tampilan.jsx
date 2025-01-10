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

  const fetchAllPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/package-categories`);
      setPackageCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
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
  
    // Validasi pembayaran
    if (!formData.hasPaid) {
      alert("Harap konfirmasi bahwa Anda telah melakukan pembayaran sebelum mengirim form.");
      return;
    }
  
    try {
      // Kirim data ke endpoint API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        const data = await response.json();
        alert("Checkout berhasil! Order ID: " + data.id);
        // Mengarahkan pengguna ke halaman utama setelah berhasil
        window.location.href = "/";  // Ganti dengan URL yang sesuai
      } else {
        const errorData = await response.json();
        alert("Terjadi kesalahan: " + errorData.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan: " + error.message);
    }    
  };
  

  useEffect(() => {
    fetchAllPackages()
  }, []);


  const eWalletNumber = "083112080715 (REFA SETYAGAMA ABDILLAH)";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-990 to-blue-990 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pemesanan Paket Desain Grafis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Masukkan alamat"
              />
            </div>
          </div>

          {/* City and Paket */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
            <div className="mt-2 space-y-2">
              {["ovo", "dana", "shopeepay"].map((method) => (
                <div className="flex items-center" key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="payment_method"
                    value={method}
                    checked={formData.payment_method === method}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label htmlFor={method} className="ml-3 block text-sm font-medium text-gray-700">
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Display Payment Number */}
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="text-gray-800">
              Silakan transfer pembayaran ke nomor e-wallet berikut:
            </p>
            <p className="text-lg font-bold text-purple-600">{eWalletNumber}</p>
          </div>

          {/* Confirmation Checkbox */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasPaid"
                checked={formData.hasPaid}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Saya telah melakukan pembayaran ke nomor di atas.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
