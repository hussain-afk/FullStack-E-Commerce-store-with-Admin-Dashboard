import { createContext, useState, useEffect, useContext } from 'react';
import { getMe } from '../api/auth.api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const StoreContext = createContext()

const StoreProvider = ({ children }) => {
    // const { allUsers, setAllUsers, allProducts, setAllProducts } = useContext(AdminContext);
    const [sameCategoryProducts, setSameCategoryProducts] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [user, setUser] = useState(null); // State to hold the current user
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [enableDasboardButton, setEnableDashboardButton] = useState(false)
    const [adminUser, setAdminUser] = useState(null); // State to hold the current admin user
    const navigate = useNavigate()

    // console.log(user, 'user in context');
    useEffect(() => {
        let mounted = true;
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const data = await getMe();
                if (!mounted) return;
                if (data) {
                    console.log('Fetched user profile:', data);
                    if(data.user.role==='admin') {
                        setEnableDashboardButton(true);
                    }else{
                        setEnableDashboardButton(false);
                    }
                    toast.success('User Already logged in');
                    setUser(data);
                    navigate('/');
                } else {
                    setUser(null);
                    toast.error('No user profile found');

                }
            } catch (error) {
                if (!mounted) return;
                console.error(
                    'Error fetching user profile:',
                    error
                );
                setUser(null);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };
        fetchUserProfile();
        return () => {
            mounted = false;
        };
    }, [setUser, setLoading]);


    return (
        <StoreContext.Provider value={{  enableDasboardButton, setEnableDashboardButton, user, setUser, sameCategoryProducts, setSameCategoryProducts, isAuthModalOpen, setIsAuthModalOpen, isVisible, setIsVisible, cartItemCount, setCartItemCount, loading, setLoading, adminUser, setAdminUser }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider