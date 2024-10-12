import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { FaHeart } from "react-icons/fa"; // Import heart icon if needed

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);

    return (
        <div className="ml-[10rem]">
            <h1 className="flex items-center text-lg font-bold ml-[3rem] mt-[3rem]">
                <FaHeart className="mr-2 text-[#93485b]" /> {/* Heart icon for favorites */}
                FAVORITE PRODUCTS
            </h1>

            <div className="flex flex-wrap">
                {favorites.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
