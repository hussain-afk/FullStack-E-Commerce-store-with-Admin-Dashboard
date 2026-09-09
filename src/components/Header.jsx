import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import useAuth from '../hooks/useAuth'

const navItems = [
  {
    name: 'Shop',
    path: '/shop',
    hasDropdown: true,
    subCategories: [
      { name: "Men's Clothing", path: '/men' },
      { name: "Women's Clothing", path: '/women' }
    ]
  },
  { name: 'On Sale', path: '/on-sale', hasDropdown: false },
  { name: 'New Arrivals', path: '/new-arrivals', hasDropdown: false },
  { name: 'Brands', path: '/brands', hasDropdown: false },
];

const Header = () => {
  const navigate = useNavigate();
  const { user, isVisible, setIsVisible, cartItemCount, setCartItemCount, enableDasboardButton } = useContext(StoreContext);
  const { handleLogout } = useAuth();
  // console.log('Current User:', user); // Log the current user to the console

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleAuthNavigate = () => {
    if (user) {
      navigate('/');
      toast.success('You are already logged in');
    }else {
      navigate('/auth');
    }
  }


  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-black/10 sticky top-0 z-50 transition-all">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-0 h-16 md:h-24 flex items-center justify-between gap-4 md:gap-8">

          {/* Left Section: Mobile Menu Icon + Logo */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMobileSearchOpen(false);
              }}
              className="md:hidden p-1.5 text-black hover:opacity-75 focus:outline-none rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <NavLink
              to="/"
              className="font-integral font-extrabold text-2xl md:text-3xl text-black tracking-tight shrink-0 select-none"
            >
              SHOP.CO
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden font-semibold md:flex items-center gap-6 lg:gap-8 text-black text-sm lg:text-base font-normal">
            {navItems.map((item) => (
              <div key={item.name} className="relative group" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer py-2 hover:text-black/70 transition-colors"
                    onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => isActive ? 'font-semibold text-black' : 'text-black/90'}
                    >
                      {item.name}
                    </NavLink>
                    <ChevronDown className={`w-4 h-4 text-black transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${isActive ? 'font-semibold text-black' : 'hover:text-black/70 text-black/90'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Desktop Shop Dropdown Menu */}
                {item.hasDropdown && isShopDropdownOpen && (
                  <div
                    className="absolute top-full left-0 w-48 bg-white border border-black/10 rounded-xl shadow-lg py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    {item.subCategories.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={`/shop${sub.path}`}
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-black/80 hover:bg-[#F0F0F0] hover:text-black transition-colors"
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-[577px] relative hidden md:block">
            <Search className="w-5 h-5 text-black/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-12 bg-[#F0F0F0] rounded-full pl-12 pr-4 text-sm md:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black/30 transition-all"
            />
          </div>

          {/* Right Actions / Icons */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className="p-1.5 md:hidden text-black hover:opacity-75 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Cart Icon with Dynamic Badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) => `p-1.5 relative text-black hover:opacity-75 transition-opacity ${isActive ? 'opacity-100' : ''}`}
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            {/* Profile Icon */}
            <div
              onClick={handleAuthNavigate}
              className="p-1.5 text-black hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Account Profile"
            >
              <User className="w-6 h-6" />
            </div>
            {/* Dashboard Button for Admin Users */}
            {
              enableDasboardButton && (

                <NavLink to="/admin/auth">
                  <button
                    className="
                        hidden md:inline-flex items-center gap-2
                        h-9 px-4
                        rounded-full
                        bg-black text-white
                        border border-neutral-800
                        text-xs font-semibold
                        shadow-sm
                        transition-all duration-200
                        hover:bg-neutral-900
                        hover:border-neutral-700
                        hover:-translate-y-0.5
                        hover:shadow-md
                        active:scale-95
                        focus:outline-none
                        focus:ring-2
                      focus:ring-neutral-400/30
            "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-3.5 h-3.5"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>

                    Dashboard
                  </button>         
                </NavLink>

              )
            }
            {
              user && (
                <button
                  onClick={handleLogout}
                  className="
                hidden md:inline-flex
                items-center justify-center
                gap-2

                h-9
                px-3.5

                rounded-full

                bg-white
                text-red-600

                border border-red-200

                text-xs
                font-semibold

                shadow-sm

                transition-all
                duration-200
                ease-out

                hover:bg-red-50
                hover:border-red-300
                hover:text-red-700
                hover:shadow-[0_4px_14px_rgba(239,68,68,0.12)]
                hover:-translate-y-0.5

                active:scale-[0.96]
                active:translate-y-0

                focus:outline-none
                focus:ring-2
                focus:ring-red-500/20
                focus:ring-offset-2
            "
                >

                  <LogOut
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />

                  <span>
                    Logout
                  </span>

                </button>
              )
            }
          </div>

        </div>

        {/* Mobile Interactive Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-black/5 bg-white">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-black/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Search for products..."
                className="w-full h-10 bg-[#F0F0F0] rounded-full pl-11 pr-4 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-b border-black/10 px-4 py-4 space-y-2 animate-in fade-in duration-200">

            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.name}>

                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 text-base transition-colors ${isActive
                      ? 'text-black font-bold'
                      : 'text-black/80 font-medium hover:text-black'
                    }`
                  }
                >
                  {item.name}
                </NavLink>


                {/* Nested Subcategories */}
                {item.hasDropdown && (
                  <div className="pl-4 space-y-1.5 py-1.5 border-l-2 border-black/10 ml-2">

                    {item.subCategories.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={`/shop${sub.path}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-black/60 hover:text-black py-1 transition-colors"
                      >
                        {sub.name}
                      </NavLink>
                    ))}

                  </div>
                )}

              </div>
            ))}


            {/* Mobile Dashboard Button */}
            {enableDasboardButton && (

              <div className="pt-3 mt-3 border-t border-black/10">

                <NavLink to="/admin/auth">
                  <button
                    className="
                        w-full
                        h-11
                        flex items-center justify-center gap-2

                        rounded-xl

                        bg-black
                        text-white

                        border border-neutral-800

                        text-sm
                        font-semibold
                        tracking-tight

                        shadow-[0_4px_14px_rgba(0,0,0,0.12)]

                        transition-all
                        duration-200

                        hover:bg-neutral-900
                        hover:border-neutral-700
                        hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)]

                        active:scale-[0.98]

                        focus:outline-none
                        focus:ring-2
                        focus:ring-neutral-400/30
                    "
                  >

                    {/* Dashboard Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-4 h-4"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        rx="1.5"
                      />

                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        rx="1.5"
                      />

                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        rx="1.5"
                      />

                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        rx="1.5"
                      />
                    </svg>

                    <span>
                      Dashboard
                    </span>

                  </button>
                </NavLink>

              </div>

            )}
            {
              user && (

                <div className="pt-3 mt-3 border-t border-black/10">

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="
                    group

                    w-full
                    h-11

                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-red-50
                    text-red-600

                    border
                    border-red-100

                    text-sm
                    font-semibold

                    transition-all
                    duration-200

                    hover:bg-red-100
                    hover:border-red-200
                    hover:text-red-700

                    active:scale-[0.98]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500/20
                "
                  >

                    <LogOut
                      size={17}
                      strokeWidth={2}
                      className="
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                    "
                    />

                    <span>
                      Logout
                    </span>

                  </button>

                </div>

              )
            }

          </nav>
        )}

      </header>
    </>
  );
};

export default Header;