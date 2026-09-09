import {deleteUser, deleteProduct, updateUser, addProduct} from '../api/admin.api.js';
// import { useContext } from 'react';
// import { AdminContext } from '../context/admin.context.jsx';
import toast from 'react-hot-toast';

const useAdminData = () => {
    // const { setAllUsers, setLoading, setAllProducts } = useContext(AdminContext);

    const handleDeleteUser = async (userId) => {
        try {
            // Call the deleteUser API function
            const deletedUser = await deleteUser(userId);
            toast.success('User deleted successfully');
            return deletedUser;
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
            throw error;
        }
    }
    const handleUpdateUser = async (userId, username, email, role, password) => {
        try {
            // Call the updateUser API function
            const updatedUser = await updateUser(userId, username, email, role, password);
            toast.success('User updated successfully');
            return updatedUser;
        } catch (error) {
            
        }
    }
    const handleDeleteProduct = async (productId) => {
        try {
            // Call the deleteProduct API function
            const deletedProduct = await deleteProduct(productId);
            toast.success('Product deleted successfully');
            return deletedProduct;
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
            throw error;
        }
    }

    const handleAddProduct = async (productData) => {
        try {
            const addedProduct = await addProduct(productData);
            toast.success('Product added successfully');
            return addedProduct;
        } catch (error) {
            console.error('Error adding product:', error.message);
            toast.error('Failed to add product');
            throw error;
        }
    };
    return {
        handleDeleteUser,
        handleDeleteProduct,
        handleUpdateUser,
        handleAddProduct
    };

}

export default useAdminData;