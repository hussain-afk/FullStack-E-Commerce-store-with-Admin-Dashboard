import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
// import Modal from './Modal';

export default function Footer() {
  return (
    <footer className="relative bg-[#F0F0F0] mt-36 sm:mt-32 pt-44 sm:pt-28 pb-8 sm:pb-12 font-sans">
      
      {/* Floating Newsletter Banner - Fully Mobile Adaptive */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[1240px] bg-black rounded-[20px] px-6 py-8 md:px-16 md:py-9 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white uppercase tracking-tight leading-[1.15] max-w-[550px] text-left">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="w-full lg:w-[350px] flex flex-col gap-3"
        >
          {/* Email Input Field */}
          <div className="relative w-full">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white text-black text-sm rounded-full pl-12 pr-4 py-3.5 outline-none placeholder:text-black/40 font-normal"
              required
            />
          </div>

          {/* Subscribe Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold text-sm rounded-full py-3.5 transition-all hover:bg-gray-100 active:scale-[0.99]"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid: Mobile pe 2 Columns, Desktop pe 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-8 md:gap-10 pb-8 border-b border-black/10">
          
          {/* Brand & Socials Section - Spans Full Width on Mobile */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3.5 sm:gap-4 mb-2 md:mb-0">
            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              SHOP.CO
            </h3>
            <p className="text-sm text-black/60 leading-relaxed max-w-[320px] md:max-w-[250px]">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaTwitter className="w-3.5 h-3.5" />
              </a>

              <a href="#" className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

              <a href="#" className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>

              <a href="#" className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                <FaGithub className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-black uppercase tracking-widest mb-3 sm:mb-5">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Works</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-black uppercase tracking-widest mb-3 sm:mb-5">
              HELP
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Customer Support</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* FAQ Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-black uppercase tracking-widest mb-3 sm:mb-5">
              FAQ
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Account</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Orders</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Payments</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-black uppercase tracking-widest mb-3 sm:mb-5">
              RESOURCES
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Free eBooks</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-black transition-colors">How to - Blog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Stacked on Mobile, Inline on Desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-black/60">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          {/* Payment Badges */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-11 h-7 bg-white rounded border border-black/10 flex items-center justify-center font-bold text-[10px] text-blue-700 italic">VISA</span>
            <span className="w-11 h-7 bg-white rounded border border-black/10 flex items-center justify-center font-bold text-[9px] text-red-500">Master</span>
            <span className="w-11 h-7 bg-white rounded border border-black/10 flex items-center justify-center font-bold text-[10px] text-blue-500 italic">PayPal</span>
            <span className="w-11 h-7 bg-white rounded border border-black/10 flex items-center justify-center font-semibold text-[10px] text-black"> Pay</span>
            <span className="w-11 h-7 bg-white rounded border border-black/10 flex items-center justify-center font-bold text-[10px] text-black">G Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}