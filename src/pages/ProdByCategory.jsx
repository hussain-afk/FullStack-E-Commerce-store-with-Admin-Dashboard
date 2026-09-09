import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { DataApiContext } from '../context/DataApi'
import ProductCard from '../components/ProdCard'
import { NavLink, Link } from 'react-router-dom'

function ProdByCategory() {
    const { data } = useContext(DataApiContext)
    const { title } = useParams();
    const ProductsByCategory = data.filter(product => product.category.toLowerCase() === title.toLowerCase());
    console.log(ProductsByCategory)
    // console.log(title)
    return (
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0 py-6 sm:py-10">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <div className=" sm:flex items-center gap-2 text-sm text-black/60 mb-6 sm:mb-8">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span className="text-xs">&gt;</span>
                    <span className="text-black font-medium">{ProductsByCategory[0]?.category || ProductsByCategory[0]?.name}</span>
                </div>
                <div>
                    <h1 className="font-integral text-2xl sm:text-3xl font-semibold text-black mb-4 sm:mb-6">
                        {ProductsByCategory[0]?.category?.toUpperCase() || ProductsByCategory[0]?.name}
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 justify-items-center">
                {
                    ProductsByCategory && ProductsByCategory.map((product) => (
                        <NavLink to={`/product/${product._id}`} key={product._id}>
                            <ProductCard key={product._id} product={product} />
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default ProdByCategory
