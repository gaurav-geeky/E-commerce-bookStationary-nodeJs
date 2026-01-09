
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyEachProducts = () => {

    const { proId } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    const loadProduct = async () => {
        try {
            const api = `${import.meta.env.VITE_BACKURL}/product/getproductdetail/${proId}`;
            const res = await axios.get(api);
            console.log(res.data);
            setProduct(res.data.myProduct);
            setMainImage(res.data.myProduct.defaultImage);  // ⭐ important
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [proId])

    if (!product) return <h2>Loading...</h2>;

    return (
        <div className="flex gap-10 p-10">

            {/* LEFT: IMAGE GALLERY */}
            <div className="flex gap-4">

                {/* Thumbnails */}
                <div className="flex flex-col gap-3">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            onClick={() => setMainImage(img)}
                            className={`w-20 h-24 object-cover cursor-pointer border 
              ${mainImage === img ? "border-blue-500" : "border-gray-300"}`}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div className="border rounded-lg p-4 w-[350px] h-[450px] flex items-center justify-center bg-white shadow">
                    <img
                        src={mainImage}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </div>

            {/* RIGHT: PRODUCT DETAILS */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>

                <p className="text-gray-600">{product.description}</p>

                <p className="text-2xl font-semibold text-red-600">
                    ₹{product.price}
                </p>

                <p className="text-sm">
                    Category : <b>{product.category}</b>
                </p>

                {product.isTopBrand && (
                    <span className="text-green-600 font-semibold">
                        ✔ Top Brand
                    </span>
                )}

                <button className="w-40 font-bold bg-yellow-400 px-2 py-3 rounded text-lg">
                    Add to Cart
                </button>

            </div>
        </div>
    );
};

export default MyEachProducts;




