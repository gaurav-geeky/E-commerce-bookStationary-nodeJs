import { FaWhatsapp, FaPhone } from "react-icons/fa";
import google from "../images/google.png"

const Footer = () => {
  return (
    <div className="w-full">
      footer area
    </div>
  );
};

export default Footer;
 







import { FaWhatsapp, FaPhone } from "react-icons/fa";
import google from "../images/google.png"

const Footer = () => {
  return (
    <section className="w-full bg-gray-900 text-white">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* ---------------- Contact Section ---------------- */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">BookHunt</h1>

            <h4 className="text-xl font-semibold mt-4">Contact Us</h4>

            <p className="flex items-start gap-2">
              <FaWhatsapp className="mt-1" />
              <span>
                Whats App <br />
                +1&nbsp;908-145-4307
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaPhone className="mt-1" />
              <span>
                Call Us <br />
                +1&nbsp;908-145-4307
              </span>
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-2">Download App</h4>
              <div className="flex gap-3">
                <img
                  src={google}
                  alt="Google Play"
                  className="h-10 cursor-pointer "
                />
              </div>
            </div>
          </div>

          {/* ---------------- Categories Section ---------------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 underline">
              Most Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>Novels</li>
              <li>Office Supplies</li>
              <li>Craft Material</li>
              <li> Notebooks</li>
              <li>Notepads suit</li>
              <li>Book Covers</li>
              <li> Stickers</li>
              <li> Highlighters</li>
            </ul>
          </div>

          {/* ---------------- Services Section ---------------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 underline">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Cancellation Policy</li>
              <li>Refund Policy</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/40">
      
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm">
        © 2025 All rights reserved. BookHunt Retail Ltd.
      </div>
    </section>
  );
};

export default Footer;























# home 

import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "./Slider";

import pencil1 from "../images/home/products/apsara.webp";
import pencil2 from "../images/home/products/colorpencil.avif";
import pencil3 from "../images/home/products/natraj.webp";
import pencil4 from "../images/home/products/pencil1.webp";

import pen1 from "../images/home/products/pen1.webp"
import pen2 from "../images/home/products/pen2.webp";
import pen3 from "../images/home/products/pen3.webp";
import pen4 from "../images/home/products/pen4.png";

import novel1 from "../images/home/products/novel1.jpg";
import novel2 from "../images/home/products/novel2.jpg";
import novel3 from "../images/home/products/novel3.jpg";
import novel4 from "../images/home/products/novel4.jpg";

import { Card, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addToCart } from "../CartSlice";


const Home = () => {
  const [mydata, setmydata] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    let api = `${import.meta.env.VITE_BACKURL}/product/branddisplay`;
    const response = await axios.get(api)
    console.log(response.data);
    setmydata(response.data);
  }

  useEffect(() => {
    loadData();
  }, []);


  const ans = mydata.map((key) => {
    return (
      <Card key={key._id} className=" w-full max-w-[18rem] shadow-md"
      >
        <Card.Img variant="top" src={key.defaultImage} className="h-[300px] object-cover"
        />

        <Card.Body>
          <Card.Title>{key.name}</Card.Title>

          <Card.Text>

            <p className="line-clamp-2">
              Description : {key.description}
            </p>

            
            <b>For : {key.category}</b>
            <br />
            <span className="text-green-600 font-bold">
              Price : {key.price}
            </span>
          </Card.Text>

          <Button
            variant="primary"
            onClick={() => dispatch(addToCart({
              id: key._id, name: key.name,
              description: key.description,
              category: key.category, price: key.price,
              image: key.defaultImage, qnty: 1,
            }))
            } >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    );
  });


  return (
    <div className="bg-gray-100">

      {/* CAROUSEL */}
      <Slider />

      {/* ------------ AMAZON STYLE CATEGORY BOXES --------- */}
      <section className="mt-[-50px] px-4 pb-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Pencils</h2>
            <div className="grid grid-cols-2">
              <div>
                <img src={pencil1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Apsara pencils</p>
              </div>
              <div>
                <img src={pencil2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Color pencils</p>
              </div>
              <div>
                <img src={pencil3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" > Natraj pencil</p>
              </div>
              <div>
                <img src={pencil4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Faber-Castell pencils</p>
              </div>
            </div>

            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>


          {/* Card 2 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Pens</h2>
            <div className="grid grid-cols-2">
              <div>
                <img src={pen1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Fountain Ink pens</p>
              </div>
              <div>
                <img src={pen2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Cello gripper</p>
              </div>
              <div>
                <img src={pen3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Cello Butterflow</p>
              </div>
              <div>
                <img src={pen4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Nataraj Classic Use & Throw Ball Pens Blue</p>
              </div>
            </div>
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Novels</h2>

            <div className="grid grid-cols-2">
              <div>
                <img src={novel1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Madeline Martin</p>
              </div>
              <div>
                <img src={novel2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Harry Potter</p>
              </div>
              <div>
                <img src={novel3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Chetan Bhagat</p>
              </div>
              <div>
                <img src={novel4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Prem Chand</p>
              </div>
            </div>
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Full Stationery</h2>
            <img src={pen3} className="w-full h-40 object-cover rounded" alt="Stationery" />
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Full Stationery</h2>
            <img src={pen2} className="w-full h-40 object-cover rounded" alt="Stationery" />
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

        </div>
      </section>
      {/* ------------ AMAZON STYLE END --------- */}

      <div className="text-blue-500 text-center text-4xl font-bold px-4 py-3 mt-6">Top Brands</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-10 place-items-center">
        {ans}
      </div>



    </div>
  );
};

export default Home;




# header 


import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Nav from "react-bootstrap/Nav";

import "../css/Header.css"; // ✅ CSS FILE

const Header = () => {
  const myData = useSelector((state) => state.mycart.cart);
  const proLength = myData.length;
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();
  const name = localStorage.getItem("name");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="header">
      {/* TOP BAR */}
      <div className="top-bar">
        {/* LOGO */}
        <div className="logo">BookHunt</div>

        {/* SEARCH */}
        <div className="search-box">
          <input type="text" placeholder="Search products…" />
          <button>
            <FaSearch />
          </button>
        </div>


        {/* ICONS */}
        <div className="header-icons">
          {/* ACCOUNT */}
          <div className="account" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="account-btn">
              <FaUser />
              <span className="account-text">Account</span>
            </button>

            {open && (
              <div className="account-dropdown">
                <Nav.Link as={Link} to="/registration" onClick={() => setOpen(false)}>
                  Signup
                </Nav.Link>

                <Nav.Link as={Link} to="/login" onClick={() => setOpen(false)}>
                  Login
                </Nav.Link>
              </div>
            )}
          </div>


          {/* CART */}
          <Nav.Link as={Link} to="/mycart" className="cart">
            <FaShoppingCart />
            <span className="cart-count">{proLength}</span>
          </Nav.Link>
        </div>
      </div>

      {/* MENU BAR */}
      <nav className="menu-bar">
        <div className="menu-links">
          <Nav.Link as={Link} to="/home">HOME</Nav.Link>
          <Nav.Link as={Link} to="/book">BOOKS</Nav.Link>
          <Nav.Link as={Link} to="/novels">NOVELS</Nav.Link>
          <Nav.Link as={Link} to="/notebooks">NOTEBOOKS</Nav.Link>
          <Nav.Link as={Link} to="/">PENS & PENCILS</Nav.Link>
          <Nav.Link as={Link} to="/mycart">CART</Nav.Link>
        </div>

        {name && <div className="welcome">Welcome {name}</div>}
      </nav>
    </header>
  );
};

export default Header;






# checkout 

import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [open, setOpen] = useState(false);
    const [instruction, setInstruction] = useState("");

    const name = localStorage.getItem("name");
    const address = localStorage.getItem("address");
    const navigate = useNavigate();

    const myData = useSelector(state => state.mycart.cart)
    useEffect(() => {
        if (!name) {
            navigate("/home")
        }
    }, [])

    let totalAmount = 0;
    let proName = "";
    let myImg = ""; 
    let ans = myData.map((key) => {
        totalAmount += key.price * key.qnty;
        proName += key.name + ", ";
        myImg = key.image
    })

    // SAVE delivery instructions FUNCTION
    let handleSave = async () => {
    };


    const initPay = (data) => {
        const options = {
            key: "rzp_test_RvMIObaIMWmXxA",
            amount: totalAmount,
            currency: data.currency,
            name: proName,
            description: "Test",
            image: myImg,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyURL = `${import.meta.env.VITE_BACKURL}/api/payment/verify`;
                    const { data } = await axios.post(verifyURL, response);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    const handlePay = async () => {
        try {
            const orderURL = `${import.meta.env.VITE_BACKURL}/api/payment/orders`;
            const { data } = await axios.post(orderURL, { amount: totalAmount });
            console.log(data);
            initPay(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    // this

    return (
        <>
            <div className='h-full'>

                <h1>Checkout page</h1>

                <div className='ml-5'> <b>  Delivering to {name} </b> <br />
                    {address}
                </div>
                <br />
                <div>
                    Total Amount : {totalAmount} <br />
                    Products : {proName}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="text-blue-600 underline"
                >
                    Add delivery instructions
                </button>

                <div>
                    {open && (
                        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                            <div className="bg-white w-full max-w-lg rounded-lg p-5">

                                {/* Header */}
                                <div className="flex justify-between mb-3">
                                    <h2 className="text-lg font-semibold">
                                        Add delivery instructions
                                    </h2>
                                    <button onClick={() => setOpen(false)}>✕</button>
                                </div>

                                {/* Textarea */}
                                <textarea
                                    rows={4}
                                    value={instruction}
                                    onChange={(e) => setInstruction(e.target.value)}
                                    placeholder="Provide landmark or navigation instructions"
                                    className="w-full border p-3 rounded resize-none"
                                />

                                {/* Footer */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}   // 👈 THIS IS IMPORTANT
                                        className="px-4 py-2 bg-yellow-500 text-black rounded"
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                <br /> <br /> <br /> 

                <button onClick={handlePay}> Make payment</button>
                {/*  this */}
            </div>
        </>
    )
}

export default Checkout;

