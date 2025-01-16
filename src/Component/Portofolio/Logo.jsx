import React, { useRef, useState, useEffect } from "react";
import axios from "axios";  

const Logo = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);

  const fetchAll = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/photos`);
      setPortfolioItems(response.data.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memicu animasi masuk dengan delay seperti di Welcome
  useEffect(() => {
    fetchAll();
    setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay untuk memulai animasi
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-16">
      <h2
        className={`text-center text-4xl sm:text-5xl font-sans font-bold text-white mb-4 md:mb-8 transition-opacity duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        Desain Logo
      </h2>

      <div className="relative">
        {/* Tombol navigasi */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#03346e] text-white p-2 rounded-full hover:bg-[#021526] transition-all"
        >
          &#10094;
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#03346e] text-white p-2 rounded-full hover:bg-[#021526] transition-all"
        >
          &#10095;
        </button>

        {/* Container scrollable */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 p-4"
          style={{ scrollbarWidth: "none" }} // Menyembunyikan scrollbar untuk Firefox
        >
          {portfolioItems
          .filter(item => item.title_id === 1)
          .map((item, index) => (
            <div
              key={item.id}
              className={`snap-center flex-none w-48 sm:w-64 md:w-80 h-64 sm:h-80 md:h-96 transition-all duration-1000 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } delay-${index * 200} overflow-hidden relative cursor-pointer ${
                hoveredId === item.id ? "scale-125 z-10" : "scale-100"
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.img_url}
                alt=""
                className={`w-full h-3/4 object-cover transition-opacity duration-500 ease-in-out transform ${
                  hoveredId && hoveredId !== item.id
                    ? "opacity-50 scale-95"
                    : "opacity-100 scale-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logo;
