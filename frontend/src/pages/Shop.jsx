import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector((state) => state.shop);

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");
    const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                const filteredProducts = filteredProductsQuery.data.filter((product) => {
                    return (
                        product.price.toString().includes(priceFilter) ||
                        product.price === parseInt(priceFilter, 10)
                    );
                });
                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand);
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    const uniqueBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="flex md:flex-row h-[40rem]">
                    <div className="bg-black bg-opacity-50 p-3 mt-2 mb-2 rounded-md">
                        <h2 className="h4 text-center py-2 bg-[#93485b] bg-opacity-80 rounded-full mb-2 border-2 border-black">
                            Filter by Categories
                        </h2>

                        <div className="p-5 w-[15rem]">
                            {categories?.map((c) => (
                                <div key={c._id} className="mb-2">
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            id={`category-${c._id}`} // Updated ID for uniqueness
                                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                                            className="w-4 h-4 text-[#93485b] bg-gray-100 border-gray-300 rounded focus:ring-[#93485b] dark:focus:ring-[#93485b] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor={`category-${c._id}`}
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-[#93485b] bg-opacity-80 rounded-full mb-2 border-2 border-black">
                            Filter by Brands
                        </h2>

                        <div className="p-5">
                            {uniqueBrands?.map((brand) => (
                                <div key={brand} className="flex items-center mr-4 mb-5">
                                    <input
                                        type="radio"
                                        id={brand}
                                        name="brand"
                                        onChange={() => handleBrandClick(brand)}
                                        className="w-4 h-4 text-[#93485b] bg-gray-100 border-gray-300 focus:ring-[#93485b] dark:focus:ring-[#93485b] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor={brand}
                                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                    >
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-[#93485b] bg-opacity-80 rounded-full mb-2 border-2 border-black">
                            Filter by Price (PKR)
                        </h2>

                        <div className="p-5 text-black w-[15rem]">
                            <input
                                type="text"
                                placeholder="Enter Price (PKR)"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full px-3 py-2 text-black placeholder:text-black bg-[#93485b] bg-opacity-50 border rounded-lg focus:outline-none focus:ring focus:border-[#93485b]"
                            />

                            <div className="p-5 pt-0">
                                <button
                                    className="w-full border-2 border-black my-4 rounded-md bg-[#93485b] text-white"
                                    onClick={() => window.location.reload()}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                products?.map((p) => (
                                    <div className="p-3" key={p._id}>
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
