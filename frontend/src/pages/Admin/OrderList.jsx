import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
    };

    const thTdStyle = {
        border: "1px solid black", // Change this to black
        padding: "8px",
        textAlign: "left",
    };

    return (
        <>
        <AdminMenu />
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
            
                <table style={tableStyle} className="container mx-auto">
                    

                    <thead>
                        <tr>
                            <th style={thTdStyle}>ITEMS</th>
                            <th style={thTdStyle}>ID</th>
                            <th style={thTdStyle}>USER</th>
                            <th style={thTdStyle}>DATE</th>
                            <th style={thTdStyle}>TOTAL</th>
                            <th style={thTdStyle}>PAID</th>
                            <th style={thTdStyle}>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td style={thTdStyle}>
                                    <img
                                        src={order.orderItems[0].image}
                                        alt={order._id}
                                        className="w-[5rem] pt-4"
                                    />
                                </td>
                                <td style={thTdStyle}>{order._id}</td>
                                <td style={thTdStyle}>{order.user ? order.user.username : "N/A"}</td>
                                <td style={thTdStyle}>{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                                <td style={thTdStyle}>$ {order.totalPrice}</td>
                                <td style={thTdStyle} className="py-2">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                                    )}
                                </td>
                                <td style={thTdStyle} className="px-2 py-2">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                                    )}
                                </td>
                                <td style={thTdStyle}>
                                    <Link to={`/order/${order._id}`}>
                                        <button>More</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OrderList;
