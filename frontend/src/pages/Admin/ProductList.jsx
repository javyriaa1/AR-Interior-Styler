import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const productData = new FormData();
        productData.append("image", image);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("quantity", quantity);
        productData.append("brand", brand);
        productData.append("countInStock", stock);

    const { data } = await createProduct(productData);

    if (data.error) {
        toast.error("Product create failed. Try Again.");
    } else {
        toast.success(`${data.name} is created`);
        navigate("/");
    }
    } catch (error) {
    console.error(error);
    toast.error("Product create failed. Try Again.");
    }
    };

    const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
        setImageUrl(res.image);
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
    };

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="ml-[2rem] text-xl font-bold h-12">Create Product</div>

                    {imageUrl && (
                        <div className="text-center border-black text-bold">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="block mx-auto max-h-[200px]"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="border border-black text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="hidden" // Hide the input
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="name" // Add ID for accessibility
                                />
                            </div>
                            <div className="flex-1 ml-10">
                                <label htmlFor="price">Price</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    id="price" // Add ID for accessibility
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <label htmlFor="quantity">Quantity</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    id="quantity" // Add ID for accessibility
                                />
                            </div>
                            <div className="flex-1 ml-10">
                                <label htmlFor="brand">Brand</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    id="brand" // Add ID for accessibility
                                />
                            </div>
                        </div>

                        <label htmlFor="description" className="my-5">Description</label>
                        <textarea
                            className="p-2 mb-3 bg-black bg-opacity-35 border-2 border-black rounded-lg w-full text-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description" // Add ID for accessibility
                        ></textarea>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="stock">Count In Stock</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    id="stock" // Add ID for accessibility
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category</label> <br />
                                <select
                                    className="p-4 mb-3 w-full border-2 border-black rounded-lg bg-black bg-opacity-35 text-white"
                                    onChange={(e) => setCategory(e.target.value)}
                                    id="category" // Add ID for accessibility
                                >
                                    <option value="">Select a category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 mt-5 rounded-lg text-white text-lg font-bold bg-[#93485b]"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
