import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaCubes, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navigation">
            <span className="interior-styler-text">InteriorStyler</span>

            <Link to="/" className="nav-item">
                <AiOutlineHome />
                <span className="nav-text">Home</span>
            </Link>
            <Link to="/shop" className="nav-item">
                <AiOutlineShopping />
                <span className="nav-text">Shop</span>
            </Link>
            <Link to="/cart" className="nav-item">
                <AiOutlineShoppingCart />
                <span className="nav-text">Cart</span>
                {cartItems.length > 0 && (
                    <span className="cart-count">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                )}
            </Link>

            <Link to="/favorite" className="nav-item">
                <FaHeart />
                <span className="nav-text">Favorites</span>
                <FavoritesCount />
            </Link>

            {/* Augmentify link logic */}
            {userInfo && !userInfo.isAdmin && (
                <Link to="/augmentify" className="nav-item">
                    <FaCubes />
                    <span className="nav-text">Augmentify</span>
                </Link>
            )}

            <div className="relative">
                <button onClick={toggleDropdown} className="nav-item">
                    {userInfo ? userInfo.username : "Profile"}
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        {userInfo?.isAdmin && (
                            <>
                                <Link to="/admin/dashboard" className="dropdown-item">Dashboard</Link>
                                <Link to="/admin/productlist" className="dropdown-item">Products</Link>
                                <Link to="/admin/categorylist" className="dropdown-item">Category</Link>
                                <Link to="/admin/orderlist" className="dropdown-item">Orders</Link>
                                <Link to="/admin/userlist" className="dropdown-item">Users</Link>
                            </>
                        )}
                        {userInfo ? (
                            <>
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <button onClick={logoutHandler} className="dropdown-item">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="dropdown-item">
                                    <AiOutlineLogin /> Login
                                </Link>
                                <Link to="/register" className="dropdown-item">
                                    <AiOutlineUserAdd /> Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
