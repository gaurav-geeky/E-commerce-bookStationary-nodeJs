
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { qntyInc, qntyDec, proRemove } from "../CartSlice";
import { useNavigate } from "react-router-dom";

import "../css/Mycart.css"; 


const Mycart = () => {
  const myData = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = myData.reduce(
    (sum, item) => sum + item.price * item.qnty,
    0
  );

  const logout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <div className="cart-container">
      {/* HEADER */}
      <div className="cart-header">
        <h1>My Cart</h1>
        <span className="logout" onClick={logout}>
          Logout
        </span>
      </div>

      {/* SUMMARY */}
      <div className="cart-summary">
        <div className="amount">
          Total Amount: <span>₹{totalAmount}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* CART ITEMS */}
      {myData.length > 0 ? (
        <div className="cart-list">
          {myData.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="category">Category: {item.category}</p>
                <p className="desc">{item.description}</p>
              </div>

              <div className="cart-price">
                ₹{item.price}
                <div className="qty">
                  <FaMinusSquare
                    onClick={() => dispatch(qntyDec({ id: item.id }))}
                  />
                  <span>{item.qnty}</span>
                  <FaPlusSquare
                    onClick={() => dispatch(qntyInc({ id: item.id }))}
                  />
                </div>
              </div>

              <div className="cart-total">
                ₹{item.price * item.qnty}
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(proRemove({ id: item.id }))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some products to see them here</p>
          <button onClick={() => navigate("/home")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Mycart;

