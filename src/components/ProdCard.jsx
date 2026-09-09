import React from 'react';

const ProductCard = ({ product = {} }) => {
  // Safe Fallbacks to Prevent Runtime Crashes
  const { 
    image, 
    img, 
    title, 
    name, 
    rating = 5, 
    price = 0, 
    originalPrice, 
    discount 
  } = product || {};

  const displayImage = image || img || "https://via.placeholder.com/300";
  const displayTitle = title || name || "Product Name";
  const safeRating = Number(rating) || 0;
  console.log("ProductCard Props:", { product, displayImage, displayTitle, safeRating, price, originalPrice, discount });

  // Render Dynamic Stars Safely
  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, index) => {
      const fillPercentage = Math.max(0, Math.min(100, (score - index) * 100));
      return (
        <span 
          key={index} 
          className="relative inline-block text-[#FFC633] text-sm xs:text-base sm:text-lg"
        >
          <span className="opacity-25">★</span>
          <span
            className="absolute left-0 top-0 overflow-hidden text-[#FFC633]"
            style={{ width: `${fillPercentage}%` }}
          >
            ★
          </span>
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[295px] mx-auto select-none cursor-pointer group">

      {/* Responsive Image Container */}
      <div className="w-full aspect-square bg-[#F0EEED] rounded-[13px] xs:rounded-[20px] overflow-hidden mb-3 sm:mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={displayImage}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover object-center mix-blend-multiply transition-opacity duration-300 group-hover:opacity-95"
        />
      </div>

      {/* Product Title */}
      <h3 className="font-bold text-xs xs:text-sm sm:text-base md:text-lg text-black truncate leading-snug">
        {displayTitle}
      </h3>

      {/* Star Rating Bar */}
      <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
        <div className="flex items-center">{renderStars(safeRating)}</div>
        <span className="text-xs sm:text-sm font-normal text-black ml-1">
          {safeRating.toFixed(1)}/<span className="text-black/40">5</span>
        </span>
      </div>

      {/* Responsive Pricing Section */}
      <div className="flex items-center flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 mt-1 sm:mt-2">
        <span className="font-bold text-base xs:text-lg sm:text-xl md:text-2xl text-black">
          ${price}
        </span>

        {originalPrice && (
          <span className="font-bold text-sm xs:text-base sm:text-lg md:text-xl text-black/40 line-through">
            ${originalPrice}
          </span>
        )}

        {discount && (
          <span className="bg-[#FF3333]/10 text-[#FF3333] text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {discount}
          </span>
        )}
      </div>

    </div>
  );
};

export default ProductCard;