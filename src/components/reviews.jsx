import React, { useState, useContext } from 'react';
import { FaStar, FaStarHalfAlt, FaCheck, FaEllipsisH } from 'react-icons/fa';
import { LuSlidersHorizontal, LuChevronDown } from 'react-icons/lu';
import { DataApiContext } from '../context/DataApi';
import Modal from './Modal';

export default function AllReviews() {
    const [isOpen, setIsOpen] = useState(false);
    // Context se comments array pass kar rahe hain with default empty array fallback
    const { comments = [] } = useContext(DataApiContext);
    const [filter, setFilter] = useState('Latest');

    // Helper function to render precise Star Ratings safely
    const renderStars = (rating = 5) => {
        const stars = [];
        const numericRating = Number(rating) || 0;
        const fullStars = Math.floor(numericRating);
        const hasHalfStar = numericRating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-[#FFC633] text-lg sm:text-xl" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-[#FFC633] text-lg sm:text-xl" />);
        }

        const remaining = 5 - Math.ceil(numericRating);
        for (let i = 0; i < remaining; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-200 text-lg sm:text-xl" />);
        }

        return stars;
    };

    // Guard Clause: jab tak Context array array-check clear na kare
    const reviewList = Array.isArray(comments) ? comments : [];

    return (
        <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            {/* Top Header Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">

                {/* Title & Count */}
                <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                        All Reviews
                    </h2>
                    <span className="text-sm sm:text-base text-black/60 font-normal">
                        ({reviewList.length})
                    </span>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 self-end sm:self-auto">
                    {/* Filter Button */}
                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F0F0F0] flex items-center justify-center text-black hover:bg-black/10 transition-colors">
                        <LuSlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button className="h-10 sm:h-12 px-4 sm:px-5 rounded-full bg-[#F0F0F0] flex items-center gap-2 text-xs sm:text-sm font-medium text-black hover:bg-black/10 transition-colors">
                            <span>{filter}</span>
                            <LuChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Write a Review Button */}
                    <button onClick={() => setIsOpen(true)} className="h-10 sm:h-12 px-5 sm:px-7 rounded-full bg-black text-white text-xs sm:text-sm font-medium hover:bg-black/80 active:scale-95 transition-all">
                        Write a Review
                    </button>
                </div>
            </div>

            {/* Reviews 2-Column Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {reviewList.slice(0, 6).map((item, idx) => (
                    <div
                        key={item.id || item._id || idx}
                        className="border border-black/10 rounded-[20px] p-6 sm:p-7 md:p-8 flex flex-col justify-between gap-3 bg-white"
                    >
                        <div>
                            {/* Header inside Card: Stars & Options Dots */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-1">
                                    {renderStars(item.rating)}
                                </div>
                                <button className="text-black/40 hover:text-black transition-colors p-1">
                                    <FaEllipsisH className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            {/* Name & Verified Icon */}
                            <div className="flex items-center gap-1.5 mb-2">
                                <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                                    {item.name || item.author || "Anonymous"}
                                </h3>
                                {(item.verified ?? true) && (
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#01AB31] flex items-center justify-center shrink-0">
                                        <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                    </span>
                                )}
                            </div>

                            {/* Comment Content */}
                            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-normal">
                                "{item.comment || item.text || item.content}"
                            </p>
                        </div>

                        {/* Date Tag */}
                        <p className="text-xs sm:text-sm font-medium text-black/40 mt-3">
                            {item.date || "Posted recently"}
                        </p>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Custom Modal Title"
            >
                <form action="http://localhost:5000/api/post/review" method="post" className="flex flex-col gap-4 font-sans py-2">
                    <input
                        type="text"
                        placeholder="enter name"
                        className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/40 transition-all"
                    />
                    <input
                        type="text"
                        placeholder="enter rating"
                        className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/40 transition-all"
                    />
                    <input
                        type="text"
                        placeholder="enter comment"
                        className="w-full bg-[#F0F0F0] text-black text-sm rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/40 transition-all"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white text-sm font-semibold rounded-full py-3.5 hover:bg-black/80 active:scale-[0.99] transition-all shadow-md mt-1"
                    >
                        Submit
                    </button>
                </form>

                <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-black/10">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2.5 bg-[#F0F0F0] hover:bg-black/10 rounded-full text-sm font-medium text-black transition-colors"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </section>
    );
}