import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Assets Import
import image1 from "../assets/category/image 11.png";
import image2 from "../assets/category/image 12.png";
import image3 from "../assets/category/image 13.png";
import image4 from "../assets/category/image 14.png";

// Categories Data Configuration
const categories = [
  {
    id: 1,
    title: "Casual",
    image: image1,
    gridClass: "md:col-span-5",
    route: "/category/casual",
  },
  {
    id: 2,
    title: "Formal",
    image: image3,
    gridClass: "md:col-span-7",
    route: "/category/formal",
  },
  {
    id: 3,
    title: "Party",
    image: image4,
    gridClass: "md:col-span-7",
    route: "/category/party",
  },
  {
    id: 4,
    title: "Gym",
    image: image2,
    gridClass: "md:col-span-5",
    route: "/category/gym",
  },
];

function CategorySelection() {
  return (
    <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 my-6 sm:my-8 font-sans">
      <div className="bg-[#F0F0F0] rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 lg:p-8">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-center text-black uppercase tracking-tight mb-5 sm:mb-8">
          BROWSE BY DRESS STYLE
        </h2>

        {/* Categories Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.route}
              className={`
                ${cat.gridClass}
                group relative block w-full
                h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px]
                overflow-hidden rounded-[14px] sm:rounded-[18px]
                bg-white transition-all duration-300
                hover:shadow-md active:scale-[0.99]
              `}
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="
                  absolute inset-0 w-full h-full
                  object-cover object-top
                  transition-transform duration-500 ease-out
                  group-hover:scale-105
                "
              />

              {/* Category Label */}
              <div className="absolute top-3 left-4 sm:top-4 sm:left-5 z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-black capitalize">
                  {cat.title}
                </h3>
              </div>

              {/* Hover Indicator Arrow */}
              <div className="
                absolute bottom-3 right-3 sm:bottom-4 sm:right-4
                flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center
                rounded-full bg-white text-black opacity-0
                translate-y-2 transition-all duration-300
                group-hover:opacity-100 group-hover:translate-y-0
                shadow-sm
              ">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </NavLink>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySelection;