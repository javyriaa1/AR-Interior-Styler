import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <button
                className={`${
                    isMenuOpen ? "top-15 right-5" : "top-18 right-7"
                } bg-[#151515] p-2 fixed rounded-lg z-50`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <FaTimes color="white" />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                    </>
                )}
            </button>

            {isMenuOpen && (
                <section
                    className="bg-black bg-opacity-50 p-4 fixed right-5 top-32 w-60 rounded-lg shadow-lg z-50"
                >
                    <ul className="list-none mt-2">
                        {[
                            { path: "/admin/dashboard", label: "Admin Dashboard" },
                            { path: "/admin/categorylist", label: "Create Category" },
                            { path: "/admin/productlist", label: "Create Product" },
                            { path: "/admin/allproductslist", label: "All Products" },
                            { path: "/admin/userlist", label: "Manage Users" },
                            { path: "/admin/orderlist", label: "Manage Orders" },
                        ].map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    className="list-item py-2 px-3 block mb-2 hover:bg-[#2E2D2D] rounded-sm"
                                    to={path}
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
};

export default AdminMenu;
