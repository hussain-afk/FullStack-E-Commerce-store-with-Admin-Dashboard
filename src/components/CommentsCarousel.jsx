import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Star } from 'lucide-react';

export default function CustomerReviews({ comments = [] }) {
  const scrollContainerRef = useRef(null);

  // Scroll logic for left/right navigation
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Guard clause for empty or invalid comments data
  if (!Array.isArray(comments) || comments.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans select-none">
      
      {/* Header & Scroll Controls */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black uppercase leading-tight">
          OUR HAPPY CUSTOMERS
        </h2>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button 
            onClick={() => scroll('left')}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 transition-all active:scale-95 text-black"
            aria-label="Previous review"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 transition-all active:scale-95 text-black"
            aria-label="Next review"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Reviews Horizontal Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {comments.map((item, index) => {
          // Rating capped safely between 1 and 5
          const starCount = Math.max(1, Math.min(5, Math.floor(item.rating || 5)));

          return (
            <div 
              key={item.id || `${item.name}-${index}`}
              className="w-[82vw] sm:w-[350px] md:w-[400px] border border-black/10 rounded-[16px] sm:rounded-[20px] p-5 sm:p-7 md:p-8 flex flex-col gap-2.5 sm:gap-3 bg-white shrink-0"
            >
              {/* Star Rating Display */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {[...Array(starCount)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFC633] text-[#FFC633]" 
                  />
                ))}
              </div>

              {/* Customer Name & Verified Icon */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                  {item.name || 'Anonymous'}
                </h3>
                
                {(item.verified ?? true) && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#01AB31] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Customer Review Text */}
              <p className="text-xs sm:text-sm md:text-base text-black/60 leading-relaxed font-normal line-clamp-4">
                "{item.comment || 'No review provided.'}"
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}