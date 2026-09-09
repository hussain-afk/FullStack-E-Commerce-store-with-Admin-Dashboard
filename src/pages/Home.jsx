import React, { useContext } from 'react';
import Hero from '../components/Hero';
import BrandsBar from '../components/BrandsBar';
import Heading from '../components/Heading';
import ProductCard from '../components/ProdCard';
import { DataApiContext } from '../context/DataApi';
import CategoryCard from '../components/CategorySelection';
import { NavLink } from 'react-router-dom';
import CommentsCarousel from '../components/CommentsCarousel';

// Product Grid Skeleton Loader for smooth layout loading
const ProductGridSkeleton = () => (
  <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="w-full h-[280px] sm:h-[320px] bg-black/5 rounded-[20px] animate-pulse"
        />
      ))}
    </div>
  </div>
);

function Home() {
  const { data, comments } = useContext(DataApiContext);

  // Safe Top Selling items extraction
  const topSellingProducts = React.useMemo(() => {
    if (!data) return [];
    return data.filter((product) => product.isTopSelling === true);
  }, [data]);

  // Safe New Arrivals fallback slice
  const newArrivals = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.length >= 13 ? data.slice(9, 13) : data.slice(0, 4);
  }, [data]);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner Section */}
      <Hero />

      {/* Partner Brands Section */}
      <BrandsBar />

      {/* New Arrivals Section */}
      <Heading title="New Arrivals" />
      {data && data.length > 0 ? (
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
            {newArrivals.map((product) => (
              <NavLink
                to={`/product/${product._id}`}
                key={product._id}
                className="w-full transition-transform duration-200 hover:-translate-y-1 block"
              >
                <ProductCard product={product} />
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <ProductGridSkeleton />
      )}

      {/* Top Selling Section */}
      <Heading title="Top Selling" />
      {data && data.length > 0 ? (
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
            {(topSellingProducts.length > 0 ? topSellingProducts.slice(0, 4) : data.slice(0, 4)).map((product) => (
              <NavLink
                to={`/product/${product._id}`}
                key={product.id}
                className="w-full transition-transform duration-200 hover:-translate-y-1 block"
              >
                <ProductCard product={product} />
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <ProductGridSkeleton />
      )}

      {/* Category Styles Grid Section */}
      <section className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
        <div className="flex flex-col items-center">
          <CategoryCard />
        </div>
      </section>

      {/* Customer Feedback / Testimonials Carousel Section */}
      {comments && comments.length > 0 ? (
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
          <CommentsCarousel comments={comments} />
        </div>
      ) : (
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
          {/* Comments Header Skeleton */}
          <div className="flex items-center justify-between mb-8 animate-pulse">
            <div className="h-8 bg-black/10 rounded-lg w-48"></div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-black/10 rounded-full"></div>
              <div className="w-10 h-10 bg-black/10 rounded-full"></div>
            </div>
          </div>

          {/* Comments Skeleton Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-black/10 rounded-[20px] p-6 sm:p-8 bg-white flex flex-col gap-4 animate-pulse"
              >
                <div className="h-5 w-24 bg-black/10 rounded-md"></div>
                <div className="h-6 bg-black/10 rounded-md w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-black/10 rounded-md w-full"></div>
                  <div className="h-4 bg-black/10 rounded-md w-5/6"></div>
                  <div className="h-4 bg-black/10 rounded-md w-2/3"></div>
                </div>
                <div className="h-4 bg-black/10 rounded-md w-1/4 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;