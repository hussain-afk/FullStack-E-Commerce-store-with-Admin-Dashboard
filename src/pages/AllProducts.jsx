import React, { useContext, useState, useMemo } from 'react'
import { DataApiContext } from '../context/DataApi'
import ProductCard from '../components/ProdCard'
import { NavLink, Link } from 'react-router-dom'
import FilterSidebar from '../components/FilterBar'
import { SlidersHorizontal } from 'lucide-react'

// Default Filter State Constant
const INITIAL_FILTERS = {
    category: '',
    minPrice: 0,
    maxPrice: 300,
    color: '',
    size: '',
    style: ''
};

function AllProducts() {
    const { data } = useContext(DataApiContext)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS)

    // Memoized Filtering Logic for Optimized Performance
    const filteredProducts = useMemo(() => {
        if (!data || !Array.isArray(data)) return [];

        return data.filter((product) => {
            // Price Filter
            const price = Number(product?.price) || 0;
            const matchesPrice = price >= selectedFilters.minPrice && price <= selectedFilters.maxPrice;

            // Category / DressCode Filter
            const matchesCategory = selectedFilters.category 
                ? (product?.dressCode || product?.category)?.toLowerCase() === selectedFilters.category.toLowerCase() 
                : true;

            // Color Filter (Handles string or array)
            const matchesColor = selectedFilters.color 
                ? Array.isArray(product?.color)
                    ? product.color.some(c => c.toLowerCase() === selectedFilters.color.toLowerCase())
                    : product?.color?.toLowerCase() === selectedFilters.color.toLowerCase()
                : true;

            // Size Filter (Handles string or array)
            const matchesSize = selectedFilters.size 
                ? Array.isArray(product?.size)
                    ? product.size.includes(selectedFilters.size)
                    : product?.size === selectedFilters.size
                : true;

            // Dress Style Filter
            const matchesStyle = selectedFilters.style 
                ? product?.style?.toLowerCase() === selectedFilters.style.toLowerCase() 
                : true;

            return matchesPrice && matchesCategory && matchesColor && matchesSize && matchesStyle;
        });
    }, [data, selectedFilters]);

    // Dynamic Header Title
    const activeTitle = selectedFilters.style || selectedFilters.category || 'All Products';

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="max-w-[1240px] mx-auto px-4 xl:px-0 py-6 sm:py-8">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-black/60 mb-3 sm:mb-4">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <span className="text-xs">&gt;</span>
                    <span className="text-black font-medium capitalize">{activeTitle}</span>
                </div>

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                        <h1 className="font-integral text-2xl sm:text-3xl font-bold text-black capitalize">
                            {activeTitle}
                        </h1>
                        <span className="text-xs sm:text-sm text-black/60">
                            Showing {filteredProducts.length > 0 ? `1-${filteredProducts.length}` : 0} of {data?.length || 0} Products
                        </span>
                    </div>

                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-black/10 transition-colors shrink-0"
                        aria-label="Open Filters"
                    >
                        <SlidersHorizontal className="w-4 h-4 text-black" />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex gap-6 lg:gap-8 items-start">
                    
                    {/* Filter Sidebar Component */}
                    <FilterSidebar 
                        isOpen={isMobileFilterOpen} 
                        onClose={() => setIsMobileFilterOpen(false)}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />

                    {/* Products Grid */}
                    <div className="w-full flex-1">
                        {!data ? (
                            // Loading State
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 6].map((i) => (
                                    <div key={i} className="h-[280px] bg-black/5 rounded-[20px] animate-pulse" />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8">
                                {filteredProducts.map((product) => (
                                    <NavLink 
                                        to={`/product/${product._id}`} 
                                        key={product._id} 
                                        className="w-full flex justify-center hover:-translate-y-1 transition-transform duration-200"
                                    >
                                        <ProductCard product={product} />
                                    </NavLink>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16 bg-[#F0EEED]/50 rounded-[20px]">
                                <h3 className="text-lg font-semibold text-black/80">No products match your filters.</h3>
                                <button 
                                    onClick={() => setSelectedFilters(INITIAL_FILTERS)}
                                    className="mt-4 text-sm underline text-black font-medium hover:text-black/70 transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllProducts;