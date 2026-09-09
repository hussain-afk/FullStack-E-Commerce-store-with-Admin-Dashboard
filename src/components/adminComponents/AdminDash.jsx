import React, { useEffect, useContext } from "react";
import {
  Users,
  Package,
  TrendingUp,
  Layers,
  MoreHorizontal,
  ArrowUpRight,
  Star,
  Activity,
  ArrowRight,
} from "lucide-react";

import { AdminContext } from "../../context/admin.context";

function Dashboard() {
  const {
    allUsers = [],
    allProducts = [],
    loading,
    fetchAllUsers,
    fetchAllProducts,
  } = useContext(AdminContext);

  useEffect(() => {
    if (fetchAllUsers) fetchAllUsers();
    if (fetchAllProducts) fetchAllProducts();
  }, [fetchAllUsers, fetchAllProducts]);

  // ============================
  // PRODUCT CATEGORIES
  // ============================
  const categoryCount = {};
  allProducts.forEach((product) => {
    const category = product.category || "Other";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
  const categories = Object.entries(categoryCount);

  // ============================
  // TOP SELLING PRODUCTS
  // ============================
  const topProducts = allProducts
    .filter((product) => product.isTopSelling === true)
    .slice(0, 5);

  // ============================
  // RECENT USERS
  // ============================
  const recentUsers = [...allUsers].reverse().slice(0, 5);

  // ============================
  // STATS
  // ============================
  const stats = [
    {
      title: "Total Users",
      value: allUsers.length,
      description: "Registered system users",
      icon: Users,
    },
    {
      title: "Total Products",
      value: allProducts.length,
      description: "Active store items",
      icon: Package,
    },
    {
      title: "Top Selling",
      value: topProducts.length,
      description: "Featured storefront items",
      icon: TrendingUp,
    },
    {
      title: "Categories",
      value: categories.length,
      description: "Product classifications",
      icon: Layers,
    },
  ];

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-48px)] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-black shadow-sm" />
          <p className="mt-3 text-sm font-medium text-gray-500">
            Loading dashboard analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-white text-black p-3 sm:p-6 lg:p-8">

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Dashboard Overview
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                Welcome back, commander. Here is what is happening in your store today.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="
            inline-flex h-10 items-center justify-center gap-2 rounded-xl
            border border-gray-200 bg-white px-4 text-sm font-medium
            text-black shadow-sm transition-all duration-200
            hover:border-black hover:bg-gray-50 active:scale-[0.98]
          "
        >
          <span>Today</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* =========================================
          STAT CARDS
      ========================================= */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="
                group relative overflow-hidden rounded-2xl
                border border-gray-200 bg-black p-6
                text-white shadow-md transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Decorative background flare */}
              <div
                className="
                  absolute -right-8 -top-8 h-32 w-32 rounded-full
                  border border-white/10 bg-white/5 transition-transform
                  duration-500 group-hover:scale-125
                "
              />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-xl bg-white/10 backdrop-blur-md transition-colors
                      group-hover:bg-white group-hover:text-black
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    className="
                      inline-flex items-center gap-1 rounded-full
                      bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md
                    "
                  >
                    <ArrowUpRight size={12} />
                    Active
                  </div>
                </div>

                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-200">
                  {stat.title}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================
          MAIN SECTION
      ========================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* =====================================
            STORE OVERVIEW GRAPH SECTION
        ===================================== */}
        <div
          className="
            rounded-2xl border border-gray-200 bg-white
            p-6 shadow-sm xl:col-span-2 flex flex-col justify-between
          "
        >
          <div>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Analytics Metric
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Store Metrics & Growth
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                  Ratio representation between active users and total store stock.
                </p>
              </div>

              <button
                type="button"
                className="
                  flex h-9 w-9 items-center justify-center rounded-xl
                  border border-gray-100 bg-gray-50 text-gray-500
                  transition-colors hover:bg-black hover:text-white
                "
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Progress Bars */}
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <div className="h-3 w-3 rounded-full bg-black shadow-sm" />
                    <span>Total Registered Users</span>
                  </div>
                  <span className="font-bold">{allUsers.length}</span>
                </div>
                <div className="h-3.5 overflow-hidden rounded-full bg-gray-100 p-0.5">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-1000"
                    style={{
                      width: `${
                        allUsers.length > 0
                          ? Math.min(
                              (allUsers.length /
                                Math.max(allUsers.length, allProducts.length)) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <div className="h-3 w-3 rounded-full bg-gray-400 shadow-sm" />
                    <span>Total Store Products</span>
                  </div>
                  <span className="font-bold">{allProducts.length}</span>
                </div>
                <div className="h-3.5 overflow-hidden rounded-full bg-gray-100 p-0.5">
                  <div
                    className="h-full rounded-full bg-gray-700 transition-all duration-1000"
                    style={{
                      width: `${
                        allProducts.length > 0
                          ? Math.min(
                              (allProducts.length /
                                Math.max(allUsers.length, allProducts.length)) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Bar Chart */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Category Volume Bar</span>
              <span>Distribution</span>
            </div>

            <div className="flex h-[180px] items-end gap-2.5 sm:gap-4 px-2">
              {Array.from({
                length: Math.max(categories.length, 5),
              }).map((_, index) => {
                const category = categories[index];
                const value = category ? category[1] : 0;
                const maxCategory = Math.max(
                  ...categories.map((item) => item[1]),
                  1
                );
                const height =
                  value > 0 ? Math.max((value / maxCategory) * 100, 12) : 8;

                return (
                  <div key={index} className="flex h-full flex-1 items-end">
                    <div
                      className="
                        group relative w-full rounded-t-lg bg-black
                        transition-all duration-500 hover:bg-gray-800 cursor-pointer
                      "
                      style={{ height: `${height}%` }}
                    >
                      {value > 0 && (
                        <div
                          className="
                            absolute -top-8 left-1/2 hidden -translate-x-1/2
                            rounded-lg bg-black px-2.5 py-1 text-[11px] font-bold
                            text-white shadow-lg group-hover:block z-10 whitespace-nowrap
                          "
                        >
                          {value} items
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Category Labels */}
            <div className="mt-3 flex gap-2.5 sm:gap-4 px-2 border-t border-gray-100 pt-3">
              {Array.from({
                length: Math.max(categories.length, 5),
              }).map((_, index) => {
                const category = categories[index];
                return (
                  <div
                    key={index}
                    className="flex-1 truncate text-center text-xs font-medium capitalize text-gray-500"
                  >
                    {category ? category[0] : "—"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================
            TOP PRODUCTS SECTION
        ===================================== */}
        <div
          className="
            rounded-2xl bg-black p-6 text-white shadow-md
            flex flex-col justify-between
          "
        >
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Top Selling Products
                </h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  Best performing items in your catalog
                </p>
              </div>
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">
                <Star size={16} className="text-white" />
              </div>
            </div>

            <div className="space-y-3">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="
                      flex items-center gap-3.5 rounded-xl
                      border border-white/10 bg-white/[0.04]
                      p-3 transition-all duration-200 hover:bg-white/[0.08]
                    "
                  >
                    {/* Number badge */}
                    <div
                      className="
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-full bg-white text-xs font-extrabold text-black
                      "
                    >
                      {index + 1}
                    </div>

                    {/* Image */}
                    <div
                      className="
                        h-11 w-11 shrink-0 overflow-hidden rounded-lg
                        border border-white/10 bg-white/10
                      "
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package size={17} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {product.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1">
                        <Star size={12} fill="currentColor" className="text-white" />
                        <span className="text-xs text-gray-400 font-medium">
                          {product.rating || 0}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold tracking-tight">
                      ${product.price || 0}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Package size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold">No top selling products</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Mark items as top selling in inventory.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* =========================================
          BOTTOM SECTION (Categories & Recent Users)
      ========================================= */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* =====================================
            CATEGORIES DISTRIBUTION
        ===================================== */}
        <div
          className="
            rounded-2xl border border-gray-200 bg-white
            p-6 shadow-sm flex flex-col justify-between
          "
        >
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Products by Category
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                  Breakdown of stock counts across categories
                </p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-black">
                <Layers size={18} />
              </div>
            </div>

            <div className="space-y-4">
              {categories.length > 0 ? (
                categories.map(([category, count]) => {
                  const max = Math.max(
                    ...categories.map((item) => item[1]),
                    1
                  );
                  const percentage = (count / max) * 100;

                  return (
                    <div key={category} className="group">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold capitalize text-black">
                          {category}
                        </span>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                          {count} products
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-black transition-all duration-700 group-hover:bg-gray-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-gray-400">
                  No category distribution available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================
            RECENT USERS
        ===================================== */}
        <div
          className="
            rounded-2xl border border-gray-200 bg-white
            p-6 shadow-sm flex flex-col justify-between
          "
        >
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Recent Registered Users
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                  Latest customer accounts created
                </p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-black">
                <Users size={18} />
              </div>
            </div>

            <div className="space-y-2">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => {
                  const name = user.username || user.name || "User";
                  return (
                    <div
                      key={user._id}
                      className="
                        flex items-center gap-3.5 rounded-xl border border-gray-100
                        bg-gray-50/50 p-3 transition-all duration-200 hover:bg-gray-50 hover:border-gray-200
                      "
                    >
                      {/* Avatar */}
                      <div
                        className="
                          flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-full bg-black text-sm font-bold text-white shadow-sm
                        "
                      >
                        {name.charAt(0).toUpperCase()}
                      </div>

                      {/* User Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-black">
                          {name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          {user.email || "No email provided"}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className="
                          inline-flex items-center gap-1.5 rounded-full
                          bg-black px-3 py-1 text-[11px] font-medium text-white shadow-sm
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Active
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-gray-400">
                  No registered users found
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;