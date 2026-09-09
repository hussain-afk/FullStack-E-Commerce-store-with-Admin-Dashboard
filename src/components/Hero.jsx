import React from 'react';
import { NavLink } from 'react-router-dom';
import HeroImage from '../assets/hero.jpg'

const stats = [
    { value: '200+', label: 'International Brands' },
    { value: '2,000+', label: 'High-Quality Products' },
    { value: '30,000+', label: 'Happy Customers' },
];

const Hero = () => {
    return (
        <section className="w-full bg-[#F2F0F1] relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-4 lg:px-0 pt-10 lg:pt-20 pb-0 flex flex-col lg:flex-row items-center justify-between min-h-[600px] lg:min-h-[663px]">

                {/* Left Content Column */}
                <div className="w-full lg:max-w-[600px] z-10 pb-10 lg:pb-28">

                    {/* Main Title */}
                    <h1 className="font-integral font-black text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] text-black tracking-tight mb-5 lg:mb-8">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    {/* Subtitle / Paragraph */}
                    <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-8 max-w-[545px]">
                        Browse through our diverse range of meticulously crafted garments, designed
                        to bring out your individuality and cater to your sense of style.
                    </p>

                    {/* Call To Action Button */}
                    <NavLink
                        to="/shop"
                        className="inline-block w-full sm:w-auto text-center bg-black hover:bg-black/80 text-white font-medium text-base px-14 py-4 rounded-full transition-all mb-12 sm:mb-12"
                    >
                        Shop Now
                    </NavLink>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8 lg:gap-12 border-t sm:border-t-0 border-black/10 pt-6 sm:pt-0">
                        {stats.map((stat, index) => (
                            <React.Fragment key={stat.label}>
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="font-bold text-2xl xs:text-3xl sm:text-3xl lg:text-[30px] leading-tight text-black">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs sm:text-sm text-black/60 font-normal mt-1 whitespace-nowrap">
                                        {stat.label}
                                    </span>
                                </div>

                                {/* Vertical Divider Line between stats */}
                                {index < stats.length - 1 && (
                                    <div className="hidden sm:block h-10 lg:h-12 w-[1px] bg-black/10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                </div>

                {/* Right Image Container */}
                <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-end h-[450px] lg:h-full self-end">

                    {/* Background Model Image */}
                    <img
                        src={HeroImage}
                        alt="SHOP.CO Fashion Models"
                        className="object-contain object-bottom max-h-[500px] lg:max-h-[660px] w-auto z-0"
                    />

                    {/* Small Star Decor (Left) */}
                    <svg
                        className="absolute top-28 left-4 lg:left-12 w-10 h-10 lg:w-14 lg:h-14 animate-pulse z-10"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z"
                            fill="black"
                        />
                    </svg>

                    {/* Large Star Decor (Top Right) */}
                    <svg
                        className="absolute top-10 right-4 lg:right-0 w-16 h-16 lg:w-26 lg:h-26 animate-pulse z-10"
                        viewBox="0 0 104 104"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M52 0C52 28.7188 28.7188 52 0 52C28.7188 52 52 75.2812 52 104C52 75.2812 75.2812 52 104 52C75.2812 52 52 28.7188 52 0Z"
                            fill="black"
                        />
                    </svg>

                </div>

            </div>
        </section>
    );
};

export default Hero;