import React, { useContext } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { DataApiContext } from '../context/DataApi';
import ProductCard from '../components/ProdCard';

function FilterProducts() {
  const { data } = useContext(DataApiContext);
  const { cat } = useParams();

  // Safe Case-Insensitive Filtering (Checking both 'gender' and 'category' fields)
  const filteredProducts = React.useMemo(() => {
    if (!data || !Array.isArray(data) || !cat) return [];

    const targetCategory = cat.toLowerCase();

    return data.filter((product) => {
      const genderMatch = product?.gender && String(product.gender).toLowerCase() === targetCategory;
      const categoryMatch = product?.category && String(product.category).toLowerCase() === targetCategory;
      return genderMatch || categoryMatch;
    });
  }, [data, cat]);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-8 sm:py-12">
      {/* Page Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="font-integral text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-black">
          Filter Products: <span className="capitalize text-black/70">{cat}</span>
        </h1>
        <p className="text-xs sm:text-sm text-black/50 font-normal mt-2">
          Showing {filteredProducts.length} items
        </p>
      </div>

      {/* Main Content Grid or Empty Fallback */}
      {!data ? (
        // Loading Skeleton
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-full h-[280px] sm:h-[320px] bg-black/5 rounded-[20px] animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        // Product Grid
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
          {filteredProducts.map((product) => (
            <NavLink
              to={`/product/${product._id}`}
              key={product._id}
              className="w-full transition-transform duration-200 hover:-translate-y-1 block"
            >
              <ProductCard product={product} />
            </NavLink>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-[#F0EEED]/50 rounded-[20px] my-6 text-center">
          <p className="text-lg sm:text-xl font-medium text-black/60 mb-4">
            No products found matching category "{cat}".
          </p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-all duration-200"
          >
            Explore All Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default FilterProducts;