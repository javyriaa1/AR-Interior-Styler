// src/pages/Auth/Logout.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice"; // API slice for logout
import { logout } from "../../redux/features/auth/authSlice"; // Redux slice for authentication
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation(); // Hook for logout mutation

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logoutApiCall().unwrap(); // Call the logout API
                dispatch(logout()); // Dispatch the logout action to clear user info
                navigate("/login"); // Navigate to the login page or home page as needed
            } catch (error) {
                console.error("Logout error:", error); // Log any error that occurs
            }
        };

        performLogout(); // Execute the logout process
    }, [dispatch, logoutApiCall, navigate]);

    return null; // No UI to render, just a redirect
};

export default Logout;
