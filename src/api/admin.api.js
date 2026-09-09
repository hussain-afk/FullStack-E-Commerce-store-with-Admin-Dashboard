import axios from "axios";

const api = axios.create({
    baseURL: 'https://smit-e-commerce-complete-backend.vercel.app', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export const getAllUsers = async () => {
    try {
        const res = await api.get('/api/auth/all-users');
        return res.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const getAllProducts = async () => {
    try {
        const res = await api.get('/api/data/products');
        return res.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

export const updateUser = async (userId, username, email, role, password) => {
    try {
        const res = await api.patch(`/api/auth/update-profile/${userId}`, {
            username,
            email,
            role,
            password
        });
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const res = await api.delete(`/api/auth/del-profile/${userId}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const addProduct = async (productData) => {
    try {
        const res = await api.post('/api/data/add', productData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const res = await api.delete(`/api/data/delete/${productId}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}