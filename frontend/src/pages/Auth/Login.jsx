import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
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
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4 text-black">Sign In</h1>

                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 text-white border border-white placeholder-transparent bg-transparent rounded w-full"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                style={{
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    color: 'white', // Ensure text color is white
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slightly opaque background
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-black"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 text-white border border-white placeholder-transparent bg-transparent rounded w-full"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                style={{
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    color: 'white', // Ensure text color is white
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slightly opaque background
                                }}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            style={{ backgroundColor: '#93485b', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', marginTop: '1rem' }}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}

                        <div className="mt-4">
                            <p className="text-black">
                                New Customer?{" "}
                                <Link
                                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                    style={{ color: '#93485b', textDecoration: 'underline' }} // Updated color
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;
