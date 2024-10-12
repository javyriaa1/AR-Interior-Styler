import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    // Fetch the product data using RTK Query
    const { data: productData, isLoading: loadingProduct } = useGetProductByIdQuery(params._id);
    
    // State management
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);

    // Fetch categories using RTK Query
    const { data: categories = [] } = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    // Populate fields with product data when loaded
    useEffect(() => {
        if (productData) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.countInStock || 0);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Image uploaded successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            setImage(res.image); // Assuming res.image is the URL of the uploaded image
        } catch (err) {
            toast.error("Image upload failed. Try again.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            description,
            price,
            category,
            quantity,
            brand,
            countInStock: stock,
            image, // Include image in the data
        };

        try {
            const data = await updateProduct({ productId: params._id, formData }).unwrap();
            toast.success("Product successfully updated", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            navigate("/admin/allproductslist");
        } catch (err) {
            console.error(err);
            toast.error("Product update failed. Try again.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const { data } = await deleteProduct(params._id).unwrap();
                toast.success(`"${data.name}" is deleted`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                navigate("/admin/allproductslist");
            } catch (err) {
                console.error(err);
                toast.error("Delete failed. Try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
        }
    };

    if (loadingProduct) return <div>Loading...</div>; // Handle loading state

    return (
        <div className="container sm:mx-[0]">
            <div className="lg:flex md:flex sm:flex justify-center items-center ">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <h1 className="h-12 text-lg font-bold">Update / Delete Product</h1>

                    {image && (
                        <div className="text-center">
                            <img
                                src={image}
                                alt="product"
                                className="block border-2 border-black mx-auto w-[30rem] h-[20rem]"
                            />
                        </div>
                    )}

                    <div className="mb-3 mt-4">
                        <label className="border border-black bg-black bg-opacity-35 py-2 lg:px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
                            {image ? image.split('/').pop() : "Upload image"} {/* Display image filename */}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="text-black w-[15rem] h-[10rem] lg:w-auto hidden"
                            />
                        </label>
                    </div>

                    <div className="w-full lg:w-min lg-pr-0 pr-3">
                        <div className="flex flex-wrap flex-row gap-3 bg-transparent lg:w-[40rem] md:w-min sm:w-min w-full z-0 shadow-xl rounded-xl hover:shadow-inner p-4 lg:m-4 m-2">
                            <div className="one w-full">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="p-4 mb-3 bg-black bg-opacity-35 w-full border-2 border-black rounded-lg text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="two w-full">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>

                            <label htmlFor="description" className="my-5 w-full">Description</label>
                            <textarea
                                id="description"
                                className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white h-[10rem]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="w-full">
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input
                                    type="text"
                                    id="countInStock"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    value={category}
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="button" // Changed to button to avoid form submission
                            onClick={handleSubmit}
                            className="bg-green-500 w-full p-4 rounded-xl text-white text-lg hover:bg-green-600 mt-4"
                        >
                            Update Product
                        </button>
                        <button
                            type="button" // Changed to button to avoid form submission
                            onClick={handleDelete}
                            className="bg-red-500 w-full p-4 rounded-xl text-white text-lg hover:bg-red-600 mt-4"
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductUpdate;
