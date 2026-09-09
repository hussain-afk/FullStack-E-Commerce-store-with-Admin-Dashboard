import { Route, Routes, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "../pages/Home";
import DetailPage from "../pages/DetailPage";
import ProdByCategory from "../pages/ProdByCategory";
import FilterProducts from "../pages/FilterProducts";
import AllProducts from "../pages/AllProducts";
import CartPage from "../pages/CartPage";
import NotFound from "../components/NotFound";
import AuthPage from "../pages/AuthPage";
import AdminAuthPage from "../pages/adminPages/AdminAuthPage";
import AdminRootLayout from "./AdminRootLayout";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-hot-toast";
// admin pages
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import AdminAllProducts from "../pages/adminPages/AdminAllProducts";
import AdminAllUsers from "../pages/adminPages/AdminAllUsers";
import AdminAllOrders from "../pages/adminPages/AdminAllOrders";
import AdminManage from "../pages/adminPages/AdminManagement";


// 1. Chhota sa Guard Component


const Routing = () => {
  const { user, adminUser } = useContext(StoreContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      toast.error('You need to be logged in to access this page');
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  const AdminProtectedRoute = ({ children }) => {
    if (adminUser) {
      if(adminUser.user.role !== 'admin') {
        toast.error('Please log in as an admin to access this page');
        return <Navigate to="/admin/auth" replace />;
      }
    }
    else {
      toast.error('You need to be an admin to access this page');
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  const AdminProtectedAuthRoute = ({ children }) => {
    if (!user || !user.role === 'admin') {
      toast.error('You need to be an admin to access this page');
      return <Navigate to="/auth" replace />;
    }
    return children;
  };


  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Unprotected Route (Har koi dekh sakta hai) */}
        <Route index element={<Home />} />

        {/* Protected Routes (Sirf logged in users ke liye) */}
        <Route 
          path="/product/:_id" 
          element={<ProtectedRoute><DetailPage /></ProtectedRoute>} 
        />
        <Route 
          path="/category/:title" 
          element={<ProtectedRoute><ProdByCategory /></ProtectedRoute>} 
        />
        <Route 
          path="/shop/:cat" 
          element={<ProtectedRoute><FilterProducts /></ProtectedRoute>} 
        />
        <Route 
          path="/shop" 
          element={<AllProducts />} 
        />
        <Route 
          path="/cart" 
          element={<ProtectedRoute><CartPage /></ProtectedRoute>} 
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route 
        path="/admin/auth" 
        element={<AdminProtectedAuthRoute><AdminAuthPage /></AdminProtectedAuthRoute>} 
      />
      {/* admin routes protected */}
      <Route path="/admin" element={<AdminProtectedRoute><AdminRootLayout /></AdminProtectedRoute>} >
          <Route index element={<AdminDashboard/>} />
          <Route path="products" element={<AdminAllProducts/>} />
          <Route path="users" element={<AdminAllUsers/>} />
          <Route path="orders" element={<AdminAllOrders/>} />
          <Route path="manage" element={<AdminManage/>} />
      </Route>
    </Routes>
  );
};

export default Routing;