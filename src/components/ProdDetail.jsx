import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataApiContext } from '../context/DataApi';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { addToCart } from '../redux/reducers/cartSlice';
import { toast } from 'react-hot-toast';

// Dynamic Star Rating Component
const StarRating = ({ rating = 0 }) => {
  const safeRating = Number(rating) || 0;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.max(0, Math.min(100, (safeRating - i) * 100));
    return (
      <span key={i} className="relative inline-block text-[#FFC633] text-base sm:text-lg">
        <span className="opacity-30">★</span>
        <span
          className="absolute left-0 top-0 overflow-hidden text-[#FFC633]"
          style={{ width: `${fillPercentage}%` }}
        >
          ★
        </span>
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1.5 my-2">
      <div className="flex leading-none">{stars}</div>
      <span className="text-xs sm:text-sm font-normal text-black mt-0.5">
        {safeRating.toFixed(1)}/<span className="text-black/40">5</span>
      </span>
    </div>
  );
};

function ProdDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  
  const { data } = useContext(DataApiContext);
  const { setSameCategoryProducts, setCartItemCount } = useContext(StoreContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Match product by ID safely
  const product = data?.find((item) => String(item._id) === String(_id));
  const category = product?.category || '';

  // Safe Image Gallery Fallbacks
  const imageGallery = React.useMemo(() => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return product?.image ? [product.image] : ['https://via.placeholder.com/600'];
  }, [product]);

  // Interactive Local States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);

  const defaultSizes = product?.sizes || ["Small", "Medium", "Large", "X-Large"];

  // Update Category in Context safely
  useEffect(() => {
    if (category && setSameCategoryProducts) {
      setSameCategoryProducts(category);
    }
  }, [category, setSameCategoryProducts]);

  // Reset Component State when Route ID changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setSelectedSize('Large');
    if (product?.colors?.[0]) {
      setSelectedColor(product.colors[0]);
    }
  }, [_id, product]);

  // Helper for checkmark contrast on color pills
  const isColorLight = (hexColor) => {
    if (!hexColor || !hexColor.startsWith('#')) return false;
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  if (!product) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-lg sm:text-xl font-medium text-black/60">Product not found.</p>
        <Link to="/" className="text-sm underline text-black hover:opacity-75">
          Return to Home
        </Link>
      </div>
    );
  }

  // Enhanced Add To Cart logic to pass selected variations
  const handleAddToCart = () => {
    const itemToCart = {
      ...product,
      selectedColor: selectedColor || product?.colors?.[0] || 'Default',
      selectedSize,
      quantity,
    };

    dispatch(addToCart(itemToCart));
    toast.success(`${product.title || product.name} added to cart!`);

    if (setCartItemCount) {
      setCartItemCount((prev) => prev + quantity);
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-4 sm:py-8 text-black">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-black/60 mb-4 sm:mb-8 truncate">
        <Link to="/" className="hover:text-black shrink-0">Home</Link>
        <span className="text-xs">&gt;</span>
        <span className="text-black font-medium truncate">{product.title || product.name}</span>
      </div>

      {/* Product Detail Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Side: Thumbnail & Main Image Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 md:gap-5">
          {/* Thumbnails Bar */}
          <div className="flex flex-row sm:flex-col gap-2.5 sm:gap-4 shrink-0 justify-start overflow-x-auto sm:overflow-y-auto max-h-[500px] no-scrollbar">
            {imageGallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] overflow-hidden border-2 shrink-0 transition-all duration-200 ${
                  selectedImageIndex === index ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Active Main Image */}
          <div className="relative w-full aspect-square sm:aspect-auto sm:min-h-[400px] md:min-h-[480px] lg:min-h-[550px] bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] overflow-hidden">
            <img
              src={imageGallery[selectedImageIndex] || imageGallery[0]}
              alt={product.title || product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-extrabold uppercase leading-tight tracking-tight text-black">
            {product.title || product.name}
          </h1>

          {/* Star Rating */}
          {product.rating !== undefined && <StarRating rating={product.rating} />}

          {/* Pricing Section */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 mt-2 mb-4">
            <span className="font-bold text-xl sm:text-2xl md:text-3xl text-black">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-bold text-xl sm:text-2xl md:text-3xl text-black/40 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="bg-[#FF3333]/10 text-[#FF3333] text-xs font-medium px-3 py-1 rounded-full">
                {product.discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-black/60 font-normal leading-relaxed mb-5 border-b border-black/10 pb-5">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5 border-b border-black/10 pb-5">
              <h3 className="text-xs sm:text-sm text-black/60 font-normal mb-2.5">Select Colors</h3>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 p-0.5 flex items-center justify-center transition-all ${
                      selectedColor === color ? 'border-black scale-105' : 'border-transparent opacity-80'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <span className={`text-sm ${isColorLight(color) ? 'text-black' : 'text-white'}`}>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="mb-6 border-b border-black/10 pb-6">
            <h3 className="text-xs sm:text-sm text-black/60 font-normal mb-2.5">Choose Size</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {defaultSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-150 ${
                    selectedSize === size
                      ? 'bg-black text-white font-medium'
                      : 'bg-[#F0F0F0] text-black font-normal hover:bg-[#E0E0E0]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Action Controls */}
          <div className="flex items-center gap-3 sm:gap-5 mt-auto pt-2">
            <div className="flex items-center gap-3 sm:gap-4 bg-[#F0F0F0] px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-xl sm:text-2xl text-black font-medium leading-none px-1"
              >
                −
              </button>
              <span className="text-sm sm:text-base font-medium text-black tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-xl sm:text-2xl text-black font-medium leading-none px-1"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-grow bg-black text-white text-sm sm:text-base font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-black/80 transition-all duration-200 active:scale-[0.99]"
            >
              Add to Cart or Order Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProdDetail;