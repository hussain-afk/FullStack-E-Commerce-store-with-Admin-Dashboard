import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../../context/admin.context.jsx";
import useAuth from "../../hooks/useAuth.jsx";

import {
  Package,
  Users,
  ShoppingBag,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  RotateCw,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "All Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "All Users",
    path: "/admin/users",
    icon: Users,
  },
  // {
  //   name: "Orders",
  //   path: "/admin/orders",
  //   icon: ShoppingBag,
  // },
  {
    name: "Manage",
    path: "/admin/manage",
    icon: Settings,
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchAllProducts, fetchAllUsers } = useContext(AdminContext);

  const { handleLogout } = useAuth();

  const handleReload = async () => {
    await fetchAllProducts();
    await fetchAllUsers();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="
          fixed left-4 top-4 z-50
          flex h-10 w-10 items-center justify-center
          rounded-xl border border-gray-200
          bg-white text-gray-700 shadow-sm
          transition-all hover:border-black hover:bg-gray-50
          md:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/40 backdrop-blur-xs
            md:hidden
            transition-opacity
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-gray-200
          bg-white shadow-xl md:shadow-none
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-18 items-center justify-between border-b border-gray-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black shadow-sm">
              <div className="h-3 w-3 rounded-xs bg-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-black tracking-tight">
                Admin Panel
              </h1>
              <p className="text-[11px] text-gray-400 font-medium">
                Store Management
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-gray-400
              hover:bg-gray-100 hover:text-black
              md:hidden
              transition-colors
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Overview
            </p>

            <div className="space-y-1.5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100/80 hover:text-black"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-black transition-colors"
                          }
                        />

                        <span className="flex-1 tracking-tight">
                          {item.name}
                        </span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer: Admin Profile + Reload */}
        <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50/50">
          
          {/* Admin Profile */}
          <div
  className="
    flex items-center gap-3
    rounded-xl
    border border-gray-200/80
    bg-white
    px-3.5 py-3
    shadow-xs
  "
>
  <div
    className="
      flex h-9 w-9 shrink-0
      items-center justify-center
      rounded-full
      bg-black
      text-xs font-bold
      text-white
      shadow-xs
    "
  >
    A
  </div>

  <div className="min-w-0 flex-1">
    <p className="truncate text-xs font-bold text-black">
      Administrator
    </p>

    <p className="text-[10px] text-gray-400 font-medium">
      Root Access
    </p>
  </div>

  <button
    type="button"
    onClick={ async () => {
      await handleLogout();
    }}
    className="
      flex h-8 w-8 shrink-0
      items-center justify-center
      rounded-lg
      border border-gray-200
      bg-white
      text-gray-500
      transition-all duration-200
      hover:border-black
      hover:bg-black
      hover:text-white
      active:scale-95
      cursor-pointer
    "
    title="Logout"
  >
    <LogOut size={15} />
  </button>
</div>

          {/* Reload Button */}
          <button
            onClick={handleReload}
            type="button"
            className="
              group flex w-full items-center justify-center gap-2
              rounded-xl
              border border-gray-200
              bg-white
              px-3 py-2.5
              text-xs font-semibold
              text-gray-700
              shadow-xs
              transition-all duration-200
              hover:border-black
              hover:bg-black
              hover:text-white
              active:scale-[0.98]
            "
          >
            <RotateCw
              size={15}
              strokeWidth={2}
              className="
                transition-transform duration-500
                group-hover:rotate-180
              "
            />
            <span>Reload Store Data</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;