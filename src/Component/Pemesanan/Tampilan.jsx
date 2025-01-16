import { CheckIcon } from "@heroicons/react/20/solid";
import backgroundImage from "../../assets/bgpemesanan.png";
import icon from "../../assets/icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Tampilan = () => {
  const [faq, setFaq] = useState([]);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(null);

  const fetchAllFaq = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/faqs`);
      setFaq(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/package-categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching package categories:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/option-packages`);
      setOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching option packages:", error);
    }
  };

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  useEffect(() => {
    fetchAllFaq();
    fetchCategories();
    fetchOptions();
  }, []);

  return (
    <div
      className="py-24 sm:py-32 text-white xl:mt-2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Pilihan Paket */}
      <div className="mx-auto px-5 md:px-10 xl:px-8 md:-mt-12 xl:-mt-10">
        <div className="mx-auto sm:text-center">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white text-4xl xl:text-5xl">
            Harga Spesial
          </h2>
          <p className="text-center mt-6 text-[15px] text-gray-500 text-sm md:px-20">
            Dapatkan desain grafis profesional dengan harga terjangkau, revisi
            sepuasnya, dan hasil cepat untuk meningkatkan citra bisnis Anda!
          </p>
        </div>

        {/* Tiga Paket */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 mx-2 xl:mx-8">
          {categories.map((category) => {
            const filteredOptions = options.filter(
              (option) => option.package_id === category.id
            );

            return (
              <div
                key={category.id}
                className="rounded-3xl bg-gradient-to-tr from-[#FFFFFF] from-60% via-[#BDE2FF] via-80% to-[#FFFFFF] to-90% text-gray-900 p-8 ring-1 ring-gray-200 xl:flex xl:flex-col xl:justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{category.name}</h3>
                  <ul className="mt-6 space-y-4">
                    {filteredOptions.map((option) => (
                      <li key={option.id} className="flex gap-x-3">
                        {option.status < 1 ? (
                          <img src={icon} alt="Icon" className="h-6 w-6" />
                        ) : (
                          <CheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        )}
                        <span>{option.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-5xl font-bold text-gray-900">
                    Rp {category.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center text-xl mt-16 relative">
        <a 
          href="/form" 
          className="font-sans bg-blue-200 text-black px-10 py-6 font-bold rounded-[15px] hover:text-white transition-all duration-500 ease-in-out hover:bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:scale-105 hover:text-black transition transform">
          PESAN SEKARANG
        </a>
      </div>


      {/* FAQ Section */}
      <div className="bg-[#1E1B4B] rounded-xl text-white mt-16 mx-6 mb-4 md:mx-10 md:mt-18 py-10 px-4 md:px-8 xl:mx-14 xl:px-12">
        <h2 className="text-center text-3xl font-bold mb-8">
          Jawaban dari semua pertanyaan
        </h2>
        <div className="mx-auto px-4">
          {faq.map((item, index) => (
            <div key={item.id} className="border-b border-gray-700">
              <button
                className="flex justify-between w-full py-4 text-left focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span>{open === index ? "-" : "+"}</span>
              </button>
              {open === index && (
                <div className="pb-4 text-gray-400 text-sm">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tampilan;
