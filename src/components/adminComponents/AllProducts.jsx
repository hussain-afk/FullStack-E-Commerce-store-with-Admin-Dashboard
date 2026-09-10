import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  Search,
  Package,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import useAdminData from "../../hooks/useAdminData";
import { AdminContext } from "../../context/admin.context";

function AllProducts() {
  const { handleDeleteProduct } = useAdminData();
  const navigate = useNavigate();
  const { allProducts, loading, fetchAllProducts } = useContext(AdminContext);
  // console.log("image", allProducts?.[29]?.image);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // allProducts.map((product) => {
  //   console.log("image", product.image);
  // });

  const handleDelProduct = async (productId) => {
    // console.log(`Delete product with ID: ${productId}`);
    await handleDeleteProduct(productId);
    await fetchAllProducts();
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-48px)] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-black animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-white text-black p-3 sm:p-6 lg:p-8">
      
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black shadow-sm">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                All Products
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage, search, and view all items in your store inventory.
              </p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH + ADD ================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="
                h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 
                pl-10 pr-4 text-sm text-black outline-none transition-all
                placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-1 focus:ring-black
              "
            />
          </div>

          <button
            onClick={() => navigate("/admin/manage")}
            type="button"
            className="
              inline-flex h-10 items-center justify-center gap-2 rounded-xl
              bg-black px-4 text-sm font-medium text-white transition-all
              hover:bg-gray-800 active:scale-[0.98] shadow-sm
            "
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            
            {/* ================= HEADER ================= */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Gender</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>

            {/* ================= BODY ================= */}
            <tbody className="divide-y divide-gray-100 text-sm">
              {allProducts?.length > 0 ? (
                allProducts.map((product) => {
                  const title = product.title || "Untitled Product";
                  const category = product.category || "—";
                  const gender = product.gender || "—";
                  const price = product.price ?? 0;
                  const rating = product.rating ?? 0;
                  const image = product.image || product.images?.[0];

                  return (
                    <tr
                      key={product._id}
                      className="transition-colors hover:bg-gray-50/80 group"
                    >
                      {/* ================= PRODUCT ================= */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                            {image ? (
                              <img
                                src={image}
                                alt={title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package size={18} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <p className="truncate font-semibold text-black">
                              {title}
                            </p>
                            <p className="mt-0.5 text-xs capitalize text-gray-400">
                              {product.dressCode || product.style || "Product"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ================= CATEGORY ================= */}
                      <td className="py-4 px-4">
                        <span className="inline-flex rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
                          {category}
                        </span>
                      </td>

                      {/* ================= GENDER ================= */}
                      <td className="py-4 px-4 capitalize text-gray-600">
                        {gender}
                      </td>

                      {/* ================= PRICE ================= */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-black">${price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ================= RATING ================= */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 font-medium text-gray-700">
                          <Star size={14} fill="currentColor" className="text-black" />
                          <span>{rating}</span>
                        </div>
                      </td>

                      {/* ================= STATUS ================= */}
                      <td className="py-4 px-4">
                        {product.isTopSelling ? (
                          <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />
                            Top Selling
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Regular
                          </span>
                        )}
                      </td>

                      {/* ================= ACTION ================= */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDelProduct(product._id)}
                          type="button"
                          className="
                            inline-flex h-8 items-center justify-center gap-1.5 rounded-lg
                            border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600
                            transition-all duration-200 hover:border-black hover:bg-black hover:text-white
                            active:scale-[0.97]
                          "
                        >
                          <Trash2 size={14} strokeWidth={1.8} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* ================= EMPTY STATE ================= */
                <tr>
                  <td colSpan="7" className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center p-6">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Package size={22} className="text-gray-400" />
                      </div>
                      <h3 className="text-sm font-bold text-black">No products found</h3>
                      <p className="mt-1 text-xs text-gray-400">
                        There are no items currently available in the store database.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        {allProducts?.length > 0 && (
          <div className="flex h-16 items-center justify-between border-t border-gray-200 bg-gray-50/50 px-6">
            <p className="text-xs text-gray-500">
              Showing <span className="font-bold text-black">{allProducts.length}</span> products
            </p>

            <div className="flex items-center gap-1">
              <button className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-black px-2.5 text-xs font-medium text-white shadow-sm">
                1
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProducts;