import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();
    
    // Ensure orders is always an array
    const orderList = Array.isArray(orders) ? orders : [];

    return (
        <div className="container ml-20 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.error || error.message}</Message>
            ) : (
                <table className="w-full border border-black">
                    <thead className="border border-black">
                        <tr>
                            <td className="py-2 border border-black">IMAGE</td>
                            <td className="py-2 border border-black">ID</td>
                            <td className="py-2 border border-black">DATE</td>
                            <td className="py-2 border border-black">TOTAL</td>
                            <td className="py-2 border border-black">PAID</td>
                            <td className="py-2 border border-black">DELIVERED</td>
                            <td className="py-2 border border-black"></td>
                        </tr>
                    </thead>

                    <tbody>
                        {orderList.map((order) => (
                            <tr key={order._id} className="border border-black">
                                <td className="py-2 border border-black">
                                    <img
                                        src={order.orderItems[0]?.image || 'fallback_image_url.jpg'}
                                        alt={order.user}
                                        className="w-[6rem] mb-5"
                                    />
                                </td>
                                <td className="py-2 border border-black">{order._id}</td>
                                <td className="py-2 border border-black">{order.createdAt.substring(0, 10)}</td>
                                <td className="py-2 border border-black">$ {order.totalPrice}</td>

                                <td className="py-2 border border-black">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                </td>

                                <td className="px-2 py-2 border border-black">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                </td>

                                <td className="px-2 py-2 border border-black">
                                    <Link to={`/order/${order._id}`}>
                                        <button className="bg-[#93485b] text-black py-2 px-3 rounded">
                                            View Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserOrder;
