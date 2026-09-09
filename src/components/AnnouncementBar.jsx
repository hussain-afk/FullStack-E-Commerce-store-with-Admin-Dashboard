import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';



const AnnouncementBar = () => {
  
  const { isVisible, setIsVisible } = useContext(StoreContext);
  // console.log("AnnouncementBar isVisible:", isVisible);

  if (!isVisible) return null;
  return (
    <div className="w-full bg-black text-white py-2 px-4 text-xs sm:text-sm font-normal relative">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center text-center pr-6 sm:pr-0">
        <p className="leading-snug">
          Sign up and get 20% off to your first order.{' '}
          <NavLink 
            to="/shop" 
            className="font-medium underline underline-offset-4 hover:text-gray-300 transition-colors inline-block ml-1"
          >
            Sign Up Now
          </NavLink>
        </p>
      </div>

      {/* Optional Close Button (matching standard ecommerce top bars) */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hidden sm:block"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;