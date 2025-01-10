import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const Merch = () => {
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
  const [hoveredId, setHoveredId] = useState(null); // Track hovered image

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

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="py-16 pt-0 md:pt-6 pb-5 md:pb-12 lg:pb-20 -mb-5">
      <h2 className="text-center text-4xl sm:text-5xl font-sans font-bold text-white mb-4 md:mb-8">
        Desain Merchandise
      </h2>

      <div className="relative">
        {/* Navigation Arrows */}
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

        {/* Scrollable container for portfolio items */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 p-4"
          style={{ scrollbarWidth: "none" }} // Hide scrollbar for Firefox
        >
          {portfolioItems
          .filter(item => item.title_id === 4)
          .map((item, index) => (
            <div
              key={item.id}
              className={`snap-center flex-none w-40 h-60 sm:w-48 sm:h-72 md:w-64 md:h-80 lg:w-80 lg:h-96 transition-transform duration-300 transform 
              ${hoveredId === item.id ? "scale-125 z-10" : "scale-95"} overflow-hidden relative`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.img_url}
                alt=""
                className={`w-full h-3/4 object-cover transition-opacity duration-300 ${
                  hoveredId && hoveredId !== item.id ? "opacity-50" : "opacity-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merch;
