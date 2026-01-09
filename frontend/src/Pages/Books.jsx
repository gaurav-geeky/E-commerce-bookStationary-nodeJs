import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice";
import { useNavigate, useOutletContext } from "react-router-dom";


const Books = () => {

  const { searchQuery } = useOutletContext();
  const [debounceSearch, setdebounceSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKURL}/product/getbooks`;
      const res = await axios.get(api);
      setBooks(res.data.bookdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  const filteredProducts = books.filter((item) =>
    item.name.toLowerCase().includes(debounceSearch.toLowerCase())
  )

  const ans = filteredProducts.map((book) => (
    <div
      key={book._id}
      className="border rounded-md p-3 hover:shadow-lg transition duration-300"
      onClick={() => navigate(`/myeachproduct/${book._id}`)}
    >
      {/* Image */}
      <div className="h-52 flex items-center justify-center mb-3">
        <img
          src={book.defaultImage}
          alt={book.name}
          className="h-full object-contain"
        />
      </div>

      {/* Book Name */}
      <h4 className="text-sm font-semibold line-clamp-2">
        {book.name}
      </h4>

      {/* Author / Description */}
      <p className="text-xs text-gray-500 line-clamp-1">
        {book.description}
      </p>

      {/* Price Section */}
      <div className="mt-2">
        <span className="text-lg font-bold">₹{book.price}</span>
        {book.mrp && (
          <span className="text-sm text-gray-400 line-through ml-2">
            ₹{book.mrp}
          </span>
        )}
        {book.discount && (
          <span className="text-sm text-green-600 ml-2">
            {book.discount}% off
          </span>
        )}
      </div>

      {/* Stock / Offer */}
      <div
        className="inline-block
                text-lg font-medium
              bg-blue-500 text-white
                mt-2 py-2 px-3
                rounded-md
                cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            addToCart({
              id: book._id,
              name: book.name,
              description: book.description,
              category: book.category,
              price: book.price,
              image: book.defaultImage,
              qnty: 1,
            })
          )
        }}>
        Add to Cart
      </div>

    </div>
  ));


  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* TOP HEADING */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Books</h1>
        <p className="text-gray-600 max-w-4xl italic">
          Discover a curated collection of books across all genres — from fiction and novels to academic references and self-development titles. Whether you're a student, a casual reader, or a book lover, our selection brings knowledge, entertainment, and inspiration to your fingertips.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ans}
      </div>
    </section>
  );
};

export default Books;
