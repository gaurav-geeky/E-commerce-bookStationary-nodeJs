import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice";
import { useNavigate, useOutletContext } from "react-router-dom";

const PenPencils = () => {
  const { searchQuery } = useOutletContext();
  const [debounceSearch, setDebounceSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pens, setPens] = useState([]);

  const loadPens = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKURL}/product/getpenpencils`;
      const res = await axios.get(api);
      setPens(res.data.pensData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPens();
  }, []);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = pens.filter((item) =>
    item.name.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  const ans = filteredProducts.map((pen) => (
    <div
      key={pen._id}
      className="border rounded-md p-3 hover:shadow-lg transition duration-300"
      onClick={() => navigate(`/myeachproduct/${pen._id}`)}
    >
      {/* Image */}
      <div className="h-52 flex items-center justify-center mb-3">
        <img
          src={pen.defaultImage}
          alt={pen.name}
          className="h-full object-contain"
        />
      </div>

      {/* Name */}
      <h4 className="text-sm font-semibold line-clamp-2">
        {pen.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-500 line-clamp-1">
        {pen.description}
      </p>

      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold">₹{pen.price}</span>
        {pen.mrp && (
          <span className="text-sm text-gray-400 line-through ml-2">₹{pen.mrp}</span>
        )}
        {pen.discount && (
          <span className="text-sm text-green-600 ml-2">{pen.discount}% off</span>
        )}
      </div>

      {/* Add to cart */}
      <div
        className="inline-block bg-blue-500 text-white mt-2 py-2 px-3 text-lg font-medium rounded-md cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            addToCart({
              id: pen._id,
              name: pen.name,
              description: pen.description,
              category: pen.category,
              price: pen.price,
              image: pen.defaultImage,
              qnty: 1,
            })
          );
        }}
      >
        Add to Cart
      </div>
    </div>
  ));

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      
      {/* TOP HEADING */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pens & Pencils</h1>
        <p className="text-gray-600 max-w-4xl italic">
          Explore our collection of premium pens, writing instruments, and pencils
          designed for students, office professionals, artists, and everyday use.
          Whether you're sketching, writing, or note-taking, we have the perfect
          tool for smooth and consistent performance.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ans}
      </div>

    </section>
  );
};

export default PenPencils;
