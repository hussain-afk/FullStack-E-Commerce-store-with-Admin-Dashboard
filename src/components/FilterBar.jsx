import React, { useState } from "react";
import { SlidersHorizontal, ChevronUp, ChevronRight, X, Check } from "lucide-react";

// Filter Options Configuration
const COLOR_OPTIONS = [
  { id: "green", bg: "#00C12B" },
  { id: "red", bg: "#F50606" },
  { id: "yellow", bg: "#F5DD06" },
  { id: "orange", bg: "#F57906" },
  { id: "cyan", bg: "#06CAF5" },
  { id: "blue", bg: "#063AF5" },
  { id: "purple", bg: "#7D06F5" },
  { id: "pink", bg: "#F506A4" },
  { id: "white", bg: "#FFFFFF", border: true },
  { id: "black", bg: "#000000" },
];

const SIZE_OPTIONS = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"];
const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];

export default function FilterSidebar({ isOpen, onClose, selectedFilters, setSelectedFilters }) {
  // Accordion Toggle States
  const [showPrice, setShowPrice] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [showSizes, setShowSizes] = useState(true);
  const [showStyles, setShowStyles] = useState(true);

  // Generic Toggle Handler to Keep Code Simple
  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  // Price Range Handler with Safety Check
  const handlePriceChange = (e, type) => {
    const val = Number(e.target.value);
    if (type === "min") {
      if (val <= selectedFilters.maxPrice - 10) {
        setSelectedFilters((prev) => ({ ...prev, minPrice: val }));
      }
    } else {
      if (val >= selectedFilters.minPrice + 10) {
        setSelectedFilters((prev) => ({ ...prev, maxPrice: val }));
      }
    }
  };

  const filterContent = (
    <div className="w-full bg-white font-sans text-black select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <h2 className="text-xl font-bold tracking-tight">Filters</h2>
        <button type="button" onClick={onClose} className="lg:hidden p-1 text-black/60 hover:text-black">
          <X className="w-6 h-6" />
        </button>
        <SlidersHorizontal className="hidden lg:block w-5 h-5 text-black/40" />
      </div>

      {/* Categories */}
      <div className="py-4 border-b border-black/10 space-y-3">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            onClick={() => toggleFilter("category", cat)}
            className={`flex items-center justify-between text-base cursor-pointer transition-colors ${
              selectedFilters.category === cat ? "font-bold text-black" : "text-black/60 hover:text-black"
            }`}
          >
            <span>{cat}</span>
            <ChevronRight className="w-4 h-4 text-black/40" />
          </div>
        ))}
      </div>

      {/* Price Range Slider */}
      <div className="py-4 border-b border-black/10">
        <div onClick={() => setShowPrice(!showPrice)} className="flex items-center justify-between cursor-pointer mb-3">
          <h3 className="text-xl font-bold">Price</h3>
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${showPrice ? "" : "rotate-180"}`} />
        </div>

        {showPrice && (
          <div className="px-1 pt-2">
            <div className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mb-4">
              
              {/* Highlight Track */}
              <div
                className="absolute h-full bg-black rounded-full"
                style={{
                  left: `${(selectedFilters.minPrice / 500) * 100}%`,
                  right: `${100 - (selectedFilters.maxPrice / 500) * 100}%`,
                }}
              />

              {/* Min Range Input */}
              <input
                type="range"
                min="0"
                max="500"
                value={selectedFilters.minPrice}
                onChange={(e) => handlePriceChange(e, "min")}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-10"
              />

              {/* Max Range Input */}
              <input
                type="range"
                min="0"
                max="500"
                value={selectedFilters.maxPrice}
                onChange={(e) => handlePriceChange(e, "max")}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-20"
              />
            </div>

            {/* Price Values Display */}
            <div className="flex justify-between text-sm font-semibold px-1">
              <span>${selectedFilters.minPrice}</span>
              <span>${selectedFilters.maxPrice}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="py-4 border-b border-black/10">
        <div onClick={() => setShowColors(!showColors)} className="flex items-center justify-between cursor-pointer mb-3">
          <h3 className="text-xl font-bold">Colors</h3>
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${showColors ? "" : "rotate-180"}`} />
        </div>

        {showColors && (
          <div className="grid grid-cols-5 gap-3">
            {COLOR_OPTIONS.map((item) => {
              const isSelected = selectedFilters.color === item.id;
              const isLightColor = item.id === "white" || item.id === "yellow";

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFilter("color", item.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                    item.border ? "border border-black/20" : ""
                  }`}
                  style={{ backgroundColor: item.bg }}
                  aria-label={`Select ${item.id} color`}
                >
                  {isSelected && (
                    <Check className={`w-4 h-4 ${isLightColor ? "text-black" : "text-white"}`} strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="py-4 border-b border-black/10">
        <div onClick={() => setShowSizes(!showSizes)} className="flex items-center justify-between cursor-pointer mb-3">
          <h3 className="text-xl font-bold">Size</h3>
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${showSizes ? "" : "rotate-180"}`} />
        </div>

        {showSizes && (
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedFilters.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleFilter("size", size)}
                  className={`px-4 py-2 rounded-full text-sm transition-all active:scale-95 ${
                    isSelected ? "bg-black text-white font-medium" : "bg-[#F0F0F0] text-black/60 hover:text-black"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Dress Styles */}
      <div className="py-4">
        <div onClick={() => setShowStyles(!showStyles)} className="flex items-center justify-between cursor-pointer mb-3">
          <h3 className="text-xl font-bold">Dress Style</h3>
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${showStyles ? "" : "rotate-180"}`} />
        </div>

        {showStyles && (
          <div className="space-y-3 mb-6">
            {DRESS_STYLES.map((style) => (
              <div
                key={style}
                onClick={() => toggleFilter("style", style)}
                className={`flex items-center justify-between text-base cursor-pointer transition-colors ${
                  selectedFilters.style === style ? "font-bold text-black" : "text-black/60 hover:text-black"
                }`}
              >
                <span>{style}</span>
                <ChevronRight className="w-4 h-4 text-black/40" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button
        type="button"
        onClick={onClose}
        className="w-full bg-black text-white font-medium py-3.5 rounded-full text-sm transition-all hover:bg-black/80 active:scale-95 mt-2"
      >
        Apply Filter
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block w-[295px] shrink-0 sticky top-5 rounded-[20px] border border-black/10 p-5 bg-white">
        {filterContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
          <div className="fixed inset-x-0 bottom-0 top-12 bg-white rounded-t-[20px] overflow-y-auto p-5 shadow-2xl z-10">
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}