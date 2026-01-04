
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
                <div className="border p-3">
                    <img
                        src={mainImage}
                        className="w-[350px] h-[450px] object-contain"
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
                    Category: <b>{product.category}</b>
                </p>

                {product.isTopBrand && (
                    <span className="text-green-600 font-semibold">
                        ✔ Top Brand
                    </span>
                )}

                <button className="bg-yellow-400 px-6 py-3 rounded text-lg">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default MyEachProducts;





// import axios from 'axios';
// import React from 'react'
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';

// const MyEachProducts = () => {
//     const { proId } = useParams();
//     const [product, setproduct] = useState({});
//     const dispatch = useDispatch();

//     const loadProduct = async () => {
//         try {
//             const api = `${import.meta.env.VITE_BACKURL}/product/getproductdetail/${proId}`;
//             const res = await axios.get(api);
//             console.log(res.data);
//             setproduct(res.data.myProduct);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         loadProduct();
//     }, [proId])

//     return (
//         <>
//             <div>
//                 this is my each product jsx whre on click of pro info displays
//                 <br /> <br />
//                 my id : {proId}
//             </div>
//         </>
//     )
// }

// export default MyEachProducts;


