import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {error.data?.message || error.message || "An error occurred."}
                </Message>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[10rem] text-black text-[3rem]">
                            Special Products
                        </h1>

                        <Link
                            to="/shop"
                            className="bg-[#93485b] font-bold rounded-full py-2 text-white px-10 mr-[18rem] mt-[10rem]"
                        >
                            Shop
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-center flex-wrap mt-[2rem]">
                            {data && data.products ? (
                                data.products.map((product) => (
                                    <div key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))
                            ) : (
                                <Message variant="info">No products available.</Message>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
