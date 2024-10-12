import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                username,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error || "An error occurred");
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center items-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-black mb-2"
                            >
                            Name
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter name"
                                className="form-input text-white  placeholder-gray-200 bg-black bg-opacity-35 p-4 border-2 border-black rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                autoComplete="name" // Added autocomplete attribute
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-black mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                className="form-input text-white  placeholder-gray-200 bg-black bg-opacity-35 p-4 border-2 border-black rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email" // Added autocomplete attribute
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-black mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                className="form-input text-white  placeholder-gray-200 bg-black bg-opacity-35 p-4 border-2 border-black rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password" // Added autocomplete attribute
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-black mb-2"
                            >
                            Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                className="form-input text-white  placeholder-gray-200 bg-black bg-opacity-35 p-4 border-2 border-black rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password" // Added autocomplete attribute
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-[#93485b] text-white py-2 px-4 rounded hover:bg-[#93485b]"
                            >
                                Update
                            </button>

                            <Link
                                to="/user-orders"
                                className="bg-[#93485b] text-white py-2 px-4 rounded hover:bg-[#93485b]"
                            >
                                My Orders
                            </Link>
                        </div>
                        {loadingUpdateProfile && <Loader />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
