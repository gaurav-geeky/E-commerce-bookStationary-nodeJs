import axios from "axios";
import React, { useEffect, useState } from "react";

const Books = () => {
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

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Books</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-md p-3 hover:shadow-lg transition duration-300"
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
            <h3 className="text-sm font-semibold line-clamp-2">
              {book.name}
            </h3>

            {/* Author / Description */}
            <p className="text-xs text-gray-500 line-clamp-1">
              {book.description}
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1 mt-1">
                <span className="bg-green-600 text-white text-xs px-1 rounded">
                  {book.rating} ★
                </span>
              </div>
            )}

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
            <p className="text-xs text-red-600 mt-1">
              Only few left
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Books;
