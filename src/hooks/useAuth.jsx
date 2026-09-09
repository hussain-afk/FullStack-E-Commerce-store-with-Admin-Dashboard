import { registerUser, loginUser, logoutUser, adminLoginUser, addUser } from '../api/auth.api.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-hot-toast';

const useAuth = () => {
    const navigate = useNavigate();
    const { setUser, setLoading, setEnableDashboardButton, enableDasboardButton, setAdminUser } = useContext(StoreContext);
    // console.log('enableDasboardButton:', enableDasboardButton);

    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true);
            const data = await registerUser(
                username,
                email,
                password
            );
            setUser(data);
            toast.success('User registered successfully');
            console.log('User registered:', data);
            if (data.user.role === 'admin') {
                setEnableDashboardButton(true);
            } else {
                setEnableDashboardButton(false);
            }
            navigate('/');
            return data;
        } catch (error) {
            console.error('Error in handleRegister:', error);
            toast.error('Failed to register user');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (username, email, password, role) => {
        try {
            setLoading(true);
            const data = await addUser(
                username,
                email,
                password,
                role
            );
            toast.success('User added successfully');
            setLoading(false);
            console.log('User added:', data);
            return data;
        } catch (error) {
            console.error('Error in handleAddUser:', error);
            toast.error('Failed to add user');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (username, password) => {
        try {
            setLoading(true);
            const data = await loginUser(
                username,
                password
            );
            setUser(data);
            console.log('User logged in:', data);
            if (data.user.role === 'admin') {
                setEnableDashboardButton(true);
            } else {
                setEnableDashboardButton(false);
            }
            toast.success('User logged in successfully');
            navigate('/');
            return data;
        } catch (error) {
            console.error('Error in handleLogin:', error);
            toast.error('Failed to log in user');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async (username, password) => {
        try {
            setLoading(true);
            const data = await adminLoginUser(
                username,
                password
            );
            if (data.user.role === 'admin') {
                setAdminUser(data);
                // setEnableDashboardButton(true);
                toast.success('Admin logged in successfully');
                navigate('/admin',{ replace: true});
            }
        } catch (error) {
            console.error('Error in handleAdminLogin:', error);
            toast.error('Failed to log in admin user');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setEnableDashboardButton(false);
            toast.success('User logged out successfully');
            navigate('/auth');
        } catch (error) {
            console.error('Error in handleLogout:', error);
            toast.error('Failed to log out user');
            throw error;
        }
    }


    return {
        handleRegister,
        handleLogin,
        handleAdminLogin,
        handleLogout,
        handleAddUser
    };

}

export default useAuth;