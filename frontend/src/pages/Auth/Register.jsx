import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return; // Exit early
        }

        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("User successfully registered");

            // Delay navigation to ensure toast is displayed
            setTimeout(() => {
                navigate(redirect);
            }, 1000); // Adjust timeout as needed
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold text-black mb-4">Register</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className="block text-sm font-medium text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 text-white border-white placeholder-transparent rounded w-full"
                            placeholder="Enter name"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            style={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 text-white border-white placeholder-transparent rounded w-full"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            style={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 text-white border-white placeholder-transparent rounded w-full"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            style={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 p-2 text-white border-white placeholder-transparent rounded w-full"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            style={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        style={{ backgroundColor: '#93485b', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', marginTop: '1rem' }}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {isLoading && <Loader />}

                    <div className="mt-4">
                        <p className="text-black">
                            Already have an account?{" "}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                style={{ color: '#93485b', textDecoration: 'underline' }}
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;
