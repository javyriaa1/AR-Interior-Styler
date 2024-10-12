import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
        toast.success("Item added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };

    return (
        <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-white bg-opacity-70 dark:border-gray-700">
            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-[#93485b] text-black text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full"
                        src={p.image}
                        alt={p.name}
                        style={{ height: "170px", objectFit: "cover" }}
                    />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-5">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-white">{p?.name}</h5>
                    <p className="text-black font-semibold text-[#93485b]">
                        {p?.price?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "PKR", // Changed currency to PKR
                            minimumFractionDigits: 0 // Optional: set to 0 for whole numbers
                        })}
                    </p>
                </div>

                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex justify-between items-center">
                    <Link
                        to={`/product/${p._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#93485b] rounded-lg hover:bg-[#7e3f6b] focus:ring-4 focus:outline-none focus:ring-[#93485b]"
                    >
                        Read More
                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>

                    <button
                        className="p-2 rounded-full"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShoppingCart size={25} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;
