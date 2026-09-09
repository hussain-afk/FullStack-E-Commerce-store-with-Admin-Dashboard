import {createContext, useEffect, useState} from 'react';
import {getAllUsers, getAllProducts} from '../api/admin.api.js';
import toast from 'react-hot-toast';


export const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const[allUsers, setAllUsers] = useState([]);
    // console.log('allUsers in context:', allUsers);
    const[loading, setLoading] = useState(false);
    const[allProducts, setAllProducts] = useState([]);
    // console.log('allProducts in context:', allProducts);

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const users = await getAllUsers();
            setAllUsers(users);
            // return users;
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const products = await getAllProducts();
            setAllProducts(products);
            // return products;
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchAllUsers();
        fetchAllProducts();
    }, [])
    

    return (
        <AdminContext.Provider value={{  fetchAllProducts , fetchAllUsers, allUsers, setAllUsers, loading, setLoading, allProducts, setAllProducts}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminProvider;