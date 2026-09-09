import React, { useEffect, useContext, useState, useRef } from "react";
import {
  Search,
  Users,
  UserPlus,
  Trash2,
  MoreVertical,
  Edit3,
  X,
} from "lucide-react";

import useAdminData from "../../hooks/useAdminData";
import { AdminContext } from "../../context/admin.context";

function AllUsers() {
  const { allUsers, loading, fetchAllUsers } = useContext(AdminContext);
  const { handleDeleteUser, handleUpdateUser } = useAdminData();

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Update form
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("user");
  const [updatePassword, setUpdatePassword] = useState("");

  // ================= FETCH USERS =================
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // ================= CLOSE DROPDOWN =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================= DELETE =================
  const handleDelete = async (userId) => {
    console.log(`Delete user with ID: ${userId}`);

    const deletedUser = await handleDeleteUser(userId);

    console.log("Deleted user:", deletedUser);

    setOpenMenuId(null);

    await fetchAllUsers();
  };

  // ================= UPDATE =================
  const handleUpdate = (user) => {
    console.log(`Update user with ID: ${user._id}`);

    setSelectedUser(user);

    setUpdateUsername(user.username || user.name || "");
    setUpdateEmail(user.email || "");
    setUpdateRole(user.role || "user");
    setUpdatePassword("");

    setOpenMenuId(null);
    setShowUpdateForm(true);
  };

  // ================= CLOSE UPDATE FORM =================
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedUser(null);
  };

  // ================= UPDATE SUBMIT =================
  const handleUserUpdate = async (e) => {
    e.preventDefault();

    // YAHAN APNI UPDATE API LOGIC LIKHNA
    console.log("User ID:", selectedUser?._id);
    console.log("Username:", updateUsername);
    console.log("Email:", updateEmail);
    console.log("Role:", updateRole);
    console.log("Password:", updatePassword);

    const userId = selectedUser?._id;

    const res = await handleUpdateUser(userId, updateUsername, updateEmail, updateRole, updatePassword);

    await fetchAllUsers();
    closeUpdateForm();
    console.log("Updated user:", res);

  };

  // ================= ADMIN STYLE =================
  const adminStyle = {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontWeight: "600",
  };

  const adminFirstCellStyle = {
    ...adminStyle,
    borderLeft: "4px solid #f43f5e",
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-48px)] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-black animate-spin" />

          <p className="text-sm font-medium text-gray-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= USERS PAGE ================= */}
      <div className="w-full max-w-7xl mx-auto min-h-screen bg-white text-black p-3 sm:p-6 lg:p-8">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black shadow-sm">
                <Users size={20} className="text-white" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                  All Users
                </h1>

                <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                  Manage, search, and view all registered users in your system.
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
                placeholder="Search users..."
                className="
                  h-10 w-full rounded-xl
                  border border-gray-200
                  bg-gray-50/50
                  pl-10 pr-4
                  text-sm text-black
                  outline-none
                  transition-all
                  placeholder:text-gray-400
                  focus:border-black
                  focus:bg-white
                  focus:ring-1
                  focus:ring-black
                "
              />
            </div>

            <button
              type="button"
              className="
                inline-flex h-10
                items-center justify-center
                gap-2 rounded-xl
                bg-black px-4
                text-sm font-medium
                text-white
                transition-all
                hover:bg-gray-800
                active:scale-[0.98]
                shadow-sm
              "
            >
              <UserPlus size={16} />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              {/* ================= TABLE HEADER ================= */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-4 px-6">Customer Name</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}
              <tbody className="divide-y divide-gray-100 text-sm">
                {allUsers?.length > 0 ? (
                  allUsers.map((user) => {
                    const username =
                      user.username || user.name || "Unknown User";

                    const email = user.email || "No email";

                    const phone =
                      user.phone || user.phoneNumber || "—";

                    const country = user.country || "Pakistan";

                    const isActive = user.status
                      ? user.status.toLowerCase() === "active"
                      : true;

                    const isAdmin =
                      user.role &&
                      user.role.toLowerCase() === "admin";

                    const isMenuOpen = openMenuId === user._id;

                    return (
                      <tr
                        key={user._id}
                        className="
                          transition-colors
                          hover:bg-gray-50/80
                          group
                        "
                      >
                        {/* ================= CUSTOMER ================= */}
                        <td
                          className="py-4 px-6"
                          style={
                            isAdmin ? adminFirstCellStyle : {}
                          }
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-full
                                text-sm font-semibold
                                shadow-sm
                                transition-transform
                                group-hover:scale-105
                                ${
                                  isAdmin
                                    ? "bg-rose-500 text-white"
                                    : "bg-black text-white"
                                }
                              `}
                            >
                              {username.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0 max-w-xs">
                              <p
                                className={`
                                  truncate font-semibold
                                  ${
                                    isAdmin
                                      ? "text-white"
                                      : "text-black"
                                  }
                                `}
                              >
                                {username}
                              </p>

                              <p
                                className={`
                                  mt-0.5 truncate text-xs
                                  ${
                                    isAdmin
                                      ? "text-slate-400"
                                      : "text-gray-400"
                                  }
                                `}
                              >
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ================= EMAIL ================= */}
                        <td
                          className={`
                            py-4 px-4
                            ${
                              isAdmin
                                ? "text-white"
                                : "text-gray-600"
                            }
                          `}
                          style={isAdmin ? adminStyle : {}}
                        >
                          <span className="truncate max-w-[200px] block">
                            {email}
                          </span>
                        </td>

                        {/* ================= STATUS ================= */}
                        <td
                          className="py-4 px-4"
                          style={isAdmin ? adminStyle : {}}
                        >
                          <span
                            className={`
                              inline-flex items-center
                              rounded-full
                              px-3 py-1
                              text-xs font-medium
                              ${
                                isAdmin
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : isActive
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-500"
                              }
                            `}
                          >
                            <span
                              className={`
                                mr-1.5
                                h-1.5 w-1.5
                                rounded-full
                                ${
                                  isAdmin
                                    ? "bg-rose-400"
                                    : isActive
                                    ? "bg-white"
                                    : "bg-gray-400"
                                }
                              `}
                            />

                            {isAdmin
                              ? "Administrator"
                              : isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        {/* ================= ACTION ================= */}
                        <td
                          className="py-4 px-6 text-center relative"
                          style={isAdmin ? adminStyle : {}}
                        >
                          <div
                            className="inline-block"
                            ref={
                              isMenuOpen ? menuRef : null
                            }
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(
                                  isMenuOpen
                                    ? null
                                    : user._id
                                )
                              }
                              className={`
                                inline-flex
                                h-8 w-8
                                items-center
                                justify-center
                                rounded-lg
                                transition-all
                                ${
                                  isAdmin
                                    ? "bg-slate-800 text-white hover:bg-slate-700"
                                    : "border border-gray-200 bg-white text-gray-600 hover:border-black hover:bg-black hover:text-white"
                                }
                                active:scale-[0.95]
                              `}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {/* ================= DROPDOWN ================= */}
                            {isMenuOpen && (
                              <div
                                className="
                                  absolute
                                  right-12
                                  top-1/2
                                  -translate-y-1/2
                                  z-50
                                  w-36
                                  rounded-xl
                                  border border-gray-200
                                  bg-white
                                  py-1.5
                                  shadow-xl
                                  text-left
                                "
                              >
                                {/* UPDATE */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdate(user)
                                  }
                                  className="
                                    flex w-full
                                    items-center
                                    gap-2
                                    px-3 py-2
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-100
                                    transition-colors
                                  "
                                >
                                  <Edit3
                                    size={14}
                                    className="text-gray-500"
                                  />

                                  <span>
                                    Update User
                                  </span>
                                </button>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(user._id)
                                  }
                                  className="
                                    flex w-full
                                    items-center
                                    gap-2
                                    px-3 py-2
                                    text-xs
                                    font-medium
                                    text-red-600
                                    hover:bg-red-50
                                    transition-colors
                                  "
                                >
                                  <Trash2
                                    size={14}
                                    className="text-red-500"
                                  />

                                  <span>
                                    Delete User
                                  </span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  /* ================= EMPTY ================= */
                  <tr>
                    <td
                      colSpan="6"
                      className="h-64 text-center"
                    >
                      <div className="flex flex-col items-center justify-center p-6">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <Users
                            size={22}
                            className="text-gray-400"
                          />
                        </div>

                        <h3 className="text-sm font-bold text-black">
                          No users found
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          There are no registered users currently
                          in the system database.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= FOOTER ================= */}
          {allUsers?.length > 0 && (
            <div
              className="
                flex h-16
                items-center
                justify-between
                border-t
                border-gray-200
                bg-gray-50/50
                px-6
              "
            >
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-bold text-black">
                  {allUsers.length}
                </span>{" "}
                users
              </p>

              <button
                type="button"
                className="
                  flex h-8 min-w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-black
                  px-2.5
                  text-xs
                  font-medium
                  text-white
                "
              >
                1
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          UPDATE USER MODAL
      ====================================================== */}
      {showUpdateForm && (
        <div
          className="
            fixed inset-0
            z-[100]
            flex items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
        >
          {/* ================= FORM MODAL ================= */}
          <form
            onSubmit={handleUserUpdate}
            className="
              w-full
              max-w-md
              rounded-2xl
              border border-gray-200
              bg-white
              shadow-2xl
            "
          >
            {/* HEADER */}
            <div
              className="
                flex items-center
                justify-between
                border-b
                border-gray-200
                px-5 py-4
              "
            >
              <div>
                <h2 className="text-lg font-bold text-black">
                  Update User
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Update user information
                </p>
              </div>

              <button
                type="button"
                onClick={closeUpdateForm}
                className="
                  flex h-9 w-9
                  items-center
                  justify-center
                  rounded-lg
                  border border-gray-200
                  text-gray-500
                  transition-all
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  cursor-pointer
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM BODY */}
            <div className="p-5">
              {/* USERNAME */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Username
                </label>

                <input
                  type="text"
                  value={updateUsername}
                  onChange={(e) =>
                    setUpdateUsername(e.target.value)
                  }
                  placeholder="Enter username"
                  className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    text-black
                    outline-none
                    placeholder:text-gray-400
                    focus:border-black
                    focus:bg-white
                    focus:ring-2
                    focus:ring-black/5
                  "
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={updateEmail}
                  onChange={(e) =>
                    setUpdateEmail(e.target.value)
                  }
                  placeholder="Enter email"
                  className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    text-black
                    outline-none
                    placeholder:text-gray-400
                    focus:border-black
                    focus:bg-white
                    focus:ring-2
                    focus:ring-black/5
                  "
                />
              </div>

              {/* ROLE */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  User Role
                </label>

                <select
                  value={updateRole}
                  onChange={(e) =>
                    setUpdateRole(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    text-black
                    outline-none
                    cursor-pointer
                    focus:border-black
                    focus:bg-white
                    focus:ring-2
                    focus:ring-black/5
                  "
                >
                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  value={updatePassword}
                  onChange={(e) =>
                    setUpdatePassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-3
                    text-sm
                    text-black
                    outline-none
                    placeholder:text-gray-400
                    focus:border-black
                    focus:bg-white
                    focus:ring-2
                    focus:ring-black/5
                  "
                />

                <p className="mt-1.5 text-[11px] text-gray-400">
                  Leave empty if you don't want to change the password.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeUpdateForm}
                  className="
                    rounded-xl
                    border border-gray-200
                    bg-white
                    px-5 py-3
                    text-sm
                    font-semibold
                    text-gray-600
                    transition-all
                    hover:border-black
                    hover:bg-gray-50
                    cursor-pointer
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    rounded-xl
                    bg-black
                    px-5 py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-gray-800
                    active:scale-[0.98]
                    cursor-pointer
                  "
                >
                  Update User
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AllUsers;