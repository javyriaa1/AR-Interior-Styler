import { useSelector } from "react-redux";

const FavoritesCount = () => {
    const favorites = useSelector((state) => state.favorites);
    const favoriteCount = favorites.length;

    return (
        <div className="absolute left-2 top-8 flex items-center justify-center">
            {favoriteCount > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full absolute -top-7 -right-6">
                    {favoriteCount}
                </span>
            )}
        </div>
    );
};

export default FavoritesCount;
