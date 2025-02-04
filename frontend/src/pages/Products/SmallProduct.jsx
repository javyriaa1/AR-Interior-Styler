import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[15rem] ml-[1rem] p-3">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded" // Fixed width and height
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div>{product.name}</div>
                        <span className="bg-pink-100 text-[#93485b] text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            {product.price.toLocaleString("en-PK", {
                                style: "currency",
                                currency: "PKR", // Change currency to PKR
                            })}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;
