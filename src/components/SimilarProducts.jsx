import React, { useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { DataApiContext } from '../context/DataApi';
import ProductCard from './ProdCard';
import Heading from './Heading';

function SimilarProducts() {
  const { id: currentProductId } = useParams();
  const { sameCategoryProducts } = useContext(StoreContext);
  const { data } = useContext(DataApiContext);

  // Filter out products in the same category, excluding the currently viewed product
  const similarProducts = data?.filter((item) => {
    const isSameCategory =
      item?.category?.toLowerCase() === sameCategoryProducts?.toLowerCase();
    const isNotCurrentProduct = String(item.id) !== String(currentProductId);
    return isSameCategory && isNotCurrentProduct;
  });

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-8 sm:py-12">
      <Heading title="You Might Also Like" />
      
      {sameCategoryProducts && (
        <p className="text-center text-xs sm:text-sm text-black/50 font-medium uppercase tracking-widest mt-2 mb-6 sm:mb-8">
          Category <span className="text-black/80 font-bold">• {sameCategoryProducts}</span>
        </p>
      )}

      {similarProducts && similarProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
          {similarProducts.slice(0, 4).map((product) => (
            <NavLink
              to={`/product/${product.id}`}
              key={product.id}
              className="w-full transition-transform duration-200 hover:-translate-y-1 block"
            >
              <ProductCard product={product} />
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-black/40 text-sm font-medium">
            {data ? 'No other similar products found.' : 'Loading products...'}
          </p>
        </div>
      )}
    </div>
  );
}

export default SimilarProducts;