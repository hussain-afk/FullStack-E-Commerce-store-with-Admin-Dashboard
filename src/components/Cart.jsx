import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/reducers/cartSlice';
import { NavLink } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';
import { LuTag } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import { StoreContext } from '../context/StoreContext';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();

  const { cartItemCount, setCartItemCount } = useContext(StoreContext);

  // Price calculations
  const subtotal = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const discountRate = 0.20; // 20% Discount
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-sans">
      
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-black/60 mb-4 sm:mb-6">
        <NavLink to="/" className="hover:text-black transition-colors">Home</NavLink>
        <span>&gt;</span>
        <span className="text-black font-medium">Cart</span>
      </nav>

      {/* Main Page Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-black uppercase tracking-tight mb-6 sm:mb-8">
        YOUR CART
      </h1>

      {/* Condition 1: Empty Cart Screen */}
      {cartItems.length === 0 ? (
        <div className="border border-black/10 rounded-[20px] p-8 text-center bg-white">
          <p className="text-lg text-black/60 font-medium mb-4">Your cart is currently empty.</p>
          <NavLink 
            to="/" 
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-all"
          >
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        /* Condition 2: Cart Items Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Cart Items Container */}
          <div className="lg:col-span-7 border border-black/10 rounded-[20px] p-4 sm:p-6 bg-white flex flex-col divide-y divide-black/10">
            {cartItems.map((item, index) => (
              <div 
                key={item.id || index} 
                className={`flex gap-3 sm:gap-4 ${
                  index === 0 ? 'pb-4 sm:pb-6' : index === cartItems.length - 1 ? 'pt-4 sm:pt-6' : 'py-4 sm:py-6'
                }`}
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#F0EEED] rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden">
                  <img 
                    src={item.image || item.img || "https://via.placeholder.com/100"} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info & Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Item Name & Delete Button */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-black line-clamp-1 pr-2">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => {
                          const qtyToRemove = item.quantity || 1;
                          dispatch(removeFromCart(item.id));
                          toast.success(`${item.name || 'Item'} removed from cart`);
                          setCartItemCount((prev) => Math.max(0, prev - qtyToRemove));
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Size & Color Properties */}
                    <p className="text-xs sm:text-sm text-black/60 mt-0.5">
                      Size: <span className="text-black/80">{item.size || 'Medium'}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-black/60">
                      Color: <span className="text-black/80">{item.color || 'White'}</span>
                    </p>
                  </div>

                  {/* Pricing & Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 sm:mt-0">
                    <span className="text-lg sm:text-2xl font-bold text-black">
                      ${item.price}
                    </span>

                    {/* Quantity Selector Badge */}
                    <div className="flex items-center gap-3 sm:gap-4 bg-[#F0F0F0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                      <button 
                        onClick={() => {
                          if ((item.quantity || 1) > 1) {
                            setCartItemCount((prev) => Math.max(0, prev - 1));
                          } else {
                            dispatch(removeFromCart(item.id));
                            toast.success(`${item.name || 'Item'} removed from cart`);
                            setCartItemCount((prev) => Math.max(0, prev - 1));
                          }
                        }}
                        className="text-black/60 hover:text-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>

                      <span className="text-xs sm:text-sm font-semibold text-black min-w-[12px] text-center">
                        {item.quantity || 1}
                      </span>

                      <button 
                        onClick={() => {
                          setCartItemCount((prev) => prev + 1);
                        }}
                        className="text-black/60 hover:text-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Order Summary Box */}
          <div className="lg:col-span-5 border border-black/10 rounded-[20px] p-5 sm:p-6 bg-white flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="flex flex-col gap-3.5 text-sm sm:text-base border-b border-black/10 pb-5">
              <div className="flex items-center justify-between text-black/60">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-black/60">
                <span>Discount (-20%)</span>
                <span className="font-bold text-red-500">-${discount}</span>
              </div>
              <div className="flex items-center justify-between text-black/60">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee}</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="flex items-center justify-between text-base sm:text-lg">
              <span className="font-semibold text-black">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-black">${total}</span>
            </div>

            {/* Promo Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
              <div className="relative flex-1">
                <LuTag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/40" />
                <input 
                  type="text" 
                  placeholder="Add promo code"
                  className="w-full bg-[#F0F0F0] text-black text-xs sm:text-sm rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-black/40 font-normal"
                />
              </div>
              <button 
                type="submit" 
                className="px-6 py-3 bg-black text-white text-xs sm:text-sm font-medium rounded-full hover:bg-black/80 active:scale-95 transition-all shrink-0"
              >
                Apply
              </button>
            </form>

            {/* Checkout Action Button */}
            <NavLink 
              to="/checkout" 
              className="w-full bg-black text-white text-xs sm:text-sm font-medium rounded-full py-3.5 sm:py-4 flex items-center justify-center gap-3 hover:bg-black/80 active:scale-[0.99] transition-all shadow-md mt-1"
            >
              <span>Go to Checkout</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;