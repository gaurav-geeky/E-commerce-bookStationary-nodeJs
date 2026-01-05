admin order - name, addres , product details 


# checkout page 

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.mycart.cart);

    const [instructionOpen, setInstructionOpen] = useState(false);
    const [instruction, setInstruction] = useState("");

    const [addressOpen, setAddressOpen] = useState(false);
    const [altAddress, setAltAddress] = useState("");

    const name = localStorage.getItem("name");
    const address = localStorage.getItem("address");
    const Id = localStorage.getItem("userid");


    useEffect(() => {
        if (!name) navigate("/home");
    }, [name, navigate]);

    /* ---------------- CALCULATIONS ---------------- */
    let totalAmount = 0;
    let proName = "";
    let myImg = "";

    cart.forEach((item) => {
        totalAmount += item.price * item.qnty;
        proName += item.name + ", ";
        myImg = item.image;
    });

    const totalProducts = cart.length;
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.qnty,
        0
    );
    const shippingFee = 0;
    const subtotal = totalAmount;
    const grandTotal = subtotal + shippingFee;

    /* ---------------- PAYMENT (UNCHANGED) ---------------- */
    const initPay = (data) => {
        const options = {
            key: "rzp_test_RvMIObaIMWmXxA",
            amount: grandTotal,
            currency: data.currency,
            name: proName,
            description: "Order Payment",
            image: myImg,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyURL = `${import.meta.env.VITE_BACKURL}/api/payment/verify`;
                    await axios.post(verifyURL, response);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: { color: "#3399cc" },
        };
        new window.Razorpay(options).open();
    };


    const handlePay = async () => {
        try {
            const orderURL = `${import.meta.env.VITE_BACKURL}/api/payment/orders`;
            const { data } = await axios.post(orderURL, { amount: grandTotal });
            initPay(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const saveaddress = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/product/saveaddress`;
        const response =
            await axios.post(api, { userid: id, address: altAddress, });
        setAddressOpen(false);
        console.log(response.data);
    }

    const saveinstruction = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/product/saveinstruction`;
        const response =
            await axios.post(api, { userid: id, instruction: instruction, });
        setInstructionOpen(false);
        console.log(response.data);
    }


    //  return jsx
    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">CHECKOUT</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ---------------- LEFT SECTION ---------------- */}
                <div className="md:col-span-2 space-y-6">
                    {/* DELIVERY OPTIONS */}
                    <div className="border p-4">
                        <h2 className="font-semibold mb-4">1. DELIVERY OPTIONS</h2>

                        <div className="border p-4 mb-4">
                            <p className="font-medium">Ship to</p>
                            <p className="text-2xl font-semibold mt-1">{name}</p>
                            <p className="text-gray-600">{address}</p>

                            <button
                                onClick={() => setAddressOpen(true)}
                                className="mt-2 text-blue-600 underline text-sm"
                            >
                                Add / Change Shipping Address
                            </button>
                            {/* give address below addressOpen && */}

                        </div>

                        <button
                            onClick={() => setInstructionOpen(true)}
                            className="text-sm text-blue-600 underline"
                        >
                            Add delivery instructions
                        </button>
                        {/* give instruction below instructionOpen &&  */}
                    </div>

                    {/* PAYMENT */}
                    <div className="border p-4">
                        <h2 className="font-semibold mb-4">2. PAYMENT</h2>

                        {/* PAYMENT BREAKDOWN */}
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                                <span>Total Products</span>
                                <span>{totalProducts}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Quantity</span>
                                <span>{totalQuantity}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping Fees</span>
                                <span className="text-green-600">
                                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>₹{grandTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePay}
                            className="w-full bg-black text-white py-3 tracking-wide"
                        >
                            PLACE ORDER & PAY ₹{grandTotal}
                        </button>
                    </div>
                </div>

                {/* ---------------- RIGHT SECTION ---------------- */}
                <div className="border p-4 sticky top-5 h-fit">
                    <h2 className="font-semibold mb-4">IN YOUR BAG</h2>

                    {cart.map((item) => (
                        <div key={item._id} className="flex gap-4 mb-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.qnty}</p>
                                <p className="text-sm">₹{item.price}</p>
                            </div>
                        </div>
                    ))}

                    <hr />
                    <div className="flex justify-between mt-4 font-semibold">
                        <span>Total</span>
                        <span>₹{grandTotal}</span>
                    </div>
                </div>
            </div>


            {/* ADDRESS form */}
            {addressOpen && (
                <Modal title="Shipping Address"
                    onClose={() => setAddressOpen(false)}>
                    <input
                        className="input border px-2 py-1 w-[350px]"
                        placeholder="Alternate Address"
                        value={altAddress}
                        onChange={(e) => setAltAddress(e.target.value)}
                    />
                    <br />
                    <button
                        className="btn-primary"
                        onClick={() => saveaddress(Id)}
                    >Save Address</button>
                </Modal>
            )}


            {/* MODAL instruction form */}
            {instructionOpen && (
                <Modal
                    title="Delivery Instructions"
                    onClose={() => setInstructionOpen(false)}
                >
                    <textarea
                        rows={4}
                        className="w-full border p-2"
                        placeholder="Landmark / directions"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                    <button
                        className="btn-primary mt-3"
                        onClick={() => saveinstruction(Id)}
                    >Save Instructions</button>
                </Modal>
            )}
        </div>
    );
};

/* ---------------- MODAL for ✕ cancel form  ---------------- */
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-5 w-full max-w-md">
            <div className="flex justify-between mb-3">
                <h3 className="font-semibold">{title}</h3>
                <button onClick={onClose}>✕</button>
            </div>
            {children}
        </div>
    </div>
);

export default Checkout;



# abhishek
 https://github.com/abhikumar11









# checkout page 

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.mycart.cart);

    const [instructionOpen, setInstructionOpen] = useState(false);
    const [instruction, setInstruction] = useState("");

    const [addressOpen, setAddressOpen] = useState(false);
    const [altAddress, setAltAddress] = useState("");
    
    const name = localStorage.getItem("name");
    const address = localStorage.getItem("address");
    const Id = localStorage.getItem("userid");

    useEffect(() => {
        if (!name) navigate("/home");
    }, [name, navigate]);

    /* ---------------- CALCULATIONS ---------------- */
    let totalAmount = 0;
    let proName = "";
    let myImg = "";

    cart.forEach((item) => {
        totalAmount += item.price * item.qnty;
        proName += item.name + ", ";
        myImg = item.image;
    });

    const totalProducts = cart.length;
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.qnty,
        0
    );
    const shippingFee = 0;
    const subtotal = totalAmount;
    const grandTotal = subtotal + shippingFee;

    // 🔴 CHANGED: minimal product data
    const simpleItems = cart.map(item => ({
        name: item.name,
        quantity: item.qnty
    }));



    /* ---------------- PAYMENT (UNCHANGED) ---------------- */
    const initPay = (data) => {
        const options = {
            key: "rzp_test_RvMIObaIMWmXxA",
            amount: grandTotal,
            currency: data.currency,
            name: proName,
            description: "Order Payment",
            image: myImg,
            order_id: data.id,

            // 🔴 CHANGED
            handler: async (response) => {
                try {
                    // verify payment
                    await axios.post(
                        `${import.meta.env.VITE_BACKURL}/api/payment/verify`,
                        response
                    );

                    // save minimal order
                    const orderdetail = await axios.post(
                        `${import.meta.env.VITE_BACKURL}/product/saveorder`,
                        {
                            name,
                            address: altAddress || address,
                            products: simpleItems,
                            totalPrice: grandTotal, 
                        }
                    ); 
                    console.log(orderdetail); 

                } catch (err) {
                    console.log(err);
                }
            },

            ///////////
            theme: { color: "#3399cc" },
        };
        new window.Razorpay(options).open();
    };


    const handlePay = async () => {
        try {
            const orderURL = `${import.meta.env.VITE_BACKURL}/api/payment/orders`;
            const { data } = await axios.post(orderURL, { amount: grandTotal });
            initPay(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const saveaddress = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/product/saveaddress`;
        const response =
            await axios.post(api, { userid: id, address: altAddress, });
        setAddressOpen(false);
        console.log(response.data);
    }

    const saveinstruction = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/product/saveinstruction`;
        const response =
            await axios.post(api, { userid: id, instruction: instruction, });
        setInstructionOpen(false);
        console.log(response.data);
    }


    //  return jsx
    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">CHECKOUT</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* ---------------- LEFT SECTION ---------------- */}
                <div className="md:col-span-2 space-y-6">
                    {/* DELIVERY OPTIONS */}
                    <div className="border p-4">
                        <h2 className="font-semibold mb-4">1. DELIVERY OPTIONS</h2>

                        <div className="border p-4 mb-4">
                            <p className="font-medium">Ship to</p>
                            <p className="text-2xl font-semibold mt-1">{name}</p>
                            <p className="text-gray-600">{address}</p>

                            <button
                                onClick={() => setAddressOpen(true)}
                                className="mt-2 text-blue-600 underline text-sm"
                            >
                                Add / Change Shipping Address
                            </button>
                            {/* give address below addressOpen && */}

                        </div>

                        <button
                            onClick={() => setInstructionOpen(true)}
                            className="text-sm text-blue-600 underline"
                        >
                            Add delivery instructions
                        </button>
                        {/* give instruction below instructionOpen &&  */}
                    </div>

                    {/* PAYMENT */}
                    <div className="border p-4">
                        <h2 className="font-semibold mb-4">2. PAYMENT</h2>

                        {/* PAYMENT BREAKDOWN */}
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                                <span>Total Products</span>
                                <span>{totalProducts}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Quantity</span>
                                <span>{totalQuantity}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping Fees</span>
                                <span className="text-green-600">
                                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>₹{grandTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePay}
                            className="w-full bg-black text-white py-3 tracking-wide"
                        >
                            PLACE ORDER & PAY ₹{grandTotal}
                        </button>
                    </div>
                </div>

                {/* ---------------- RIGHT SECTION ---------------- */}
                <div className="border p-4 sticky top-5 h-fit">
                    <h2 className="font-semibold mb-4">IN YOUR BAG</h2>
                    {cart.map((item) => (
                        <div key={item._id} className="flex gap-4 mb-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.qnty}</p>
                                <p className="text-sm">₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className="flex justify-between mt-4 font-semibold">
                        <span>Total</span>
                        <span>₹{grandTotal}</span>
                    </div>
                </div>
            </div>



            {/* ADDRESS form */}
            {addressOpen && (
                <Modal title="Shipping Address"
                    onClose={() => setAddressOpen(false)}>
                    <input
                        className="input border px-2 py-1 w-[350px]"
                        placeholder="Alternate Address"
                        value={altAddress}
                        onChange={(e) => setAltAddress(e.target.value)}
                    />
                    <br />
                    <button
                        className="btn-primary"
                        onClick={() => saveaddress(Id)}
                    >Save Address</button>
                </Modal>
            )}


            {/* MODAL instruction form */}
            {instructionOpen && (
                <Modal
                    title="Delivery Instructions"
                    onClose={() => setInstructionOpen(false)}
                >
                    <textarea
                        rows={4}
                        className="w-full border p-2"
                        placeholder="Landmark / directions"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                    <button
                        className="btn-primary mt-3"
                        onClick={() => saveinstruction(Id)}
                    >Save Instructions</button>
                </Modal>
            )}
        </div>
    );
};

/* ---------------- MODAL for ✕ cancel form  ---------------- */
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-5 w-full max-w-md">
            <div className="flex justify-between mb-3">
                <h3 className="font-semibold">{title}</h3>
                <button onClick={onClose}>✕</button>
            </div>
            {children}
        </div>
    </div>
);

export default Checkout;


1. invoice 
2. product CRUD admin adds 
3. delivery status 
4.  









# add product admin form 


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]); // 👈 NEW (for image preview)
  const [isTopBrand, setIsTopBrand] = useState(false);  // for check topbrand

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files); // convert FileList → Array
    setImages(files); // existing logic (for upload)

    // 👇 NEW: create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // remove img function
  const removeImage = (removeIndex) => {
    setPreview(prev =>
      prev.filter((_, index) => index !== removeIndex)
    );

    setImages(prev =>
      prev.filter((_, index) => index !== removeIndex)
    );
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${import.meta.env.VITE_BACKURL}/admin/addproduct`;
    const formData = new FormData();

    for (let key in input) {
      formData.append(key, input[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const response = await axios.post(api, formData);
    alert(response.data.msg);
    console.log(response.data)
  }


  return (
    <div className="w-full flex justify-center">

      {/* ===== FORM CARD ===== */}
      <div
        className="
          w-full 
          max-w-md sm:max-w-lg lg:max-w-xl
          bg-gray-900 text-white
          p-4 sm:p-5 lg:p-6
          rounded-lg
          shadow-[0_4px_20px_rgba(255,255,255,0.15)]
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b border-gray-600 pb-2">
          Add Product
        </h2>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Enter Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Mark as Top Brand"
              name="isTopBrand"
              checked={isTopBrand}
              onChange={(e) => setIsTopBrand(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Select name="category" onChange={handleInput}>
              <option>Open this select menu</option>
              <option value="Books">Books</option>
              <option value="Novels">Novels</option>
              <option value="Pens&Pencils">Pens & Pencils</option>
              <option value="Notebooks">Notebooks</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file" multiple onChange={handleImage}
            />
          </Form.Group>

          {/* IMAGE PREVIEW WITH REMOVE BUTTON */}
          {preview.length > 0 && (
            <div className="flex gap-3 flex-wrap mb-4">
              {preview.map((img, index) => (
                <div key={img} className="relative">

                  {/* ❌ REMOVE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white 
                     rounded-full w-5 h-5 flex items-center justify-center
                     text-xs hover:bg-red-700"
                  >
                    ✕
                  </button>

                  {/* IMAGE */}
                  <img
                    src={img}
                    className="w-24 h-24 object-cover rounded border"
                    alt="preview"
                  />
                </div>
              ))}
            </div>
          )}


          <div className="text-center ">
            <Button variant="primary" type="submit" className="px-4 py-1 w-100 sm:w-auto" onClick={handleSubmit}>
              Submit
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default AddProduct;


/*
images   → real File objects (for upload)
preview  → temporary URLs (for UI)

*/





# admin dashboard 

import { Link, Outlet } from "react-router-dom";
import "../css/Header.css";
import logo from "../assets/bookLogo.png";

const AdminDashboard = () => {
  return (
    <section className="min-h-screen w-full bg-gray-900 px-2 pt-4">

      {/* ===== HEADER ===== */}
      <header
        className="text-white text-2xl sm:text-4xl font-black 
        w-full bg-gray-800 p-4 rounded-lg
        shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:text-left"
      >
        Welcome To Admin DashBoard

        <div className="logo">
          <img src={logo} alt="logo" /> BookHunt
        </div>

      </header>

      {/* ===== CONTENT ===== */}
      <div
        className="
          flex flex-col md:flex-row
          mt-4 gap-4
          min-h-[calc(100vh-110px)]
        "
      >

        {/* ===== LEFT MENU ===== */}
        <aside
          className="
            w-full md:w-[22%] lg:w-[18%]
            bg-gray-800 rounded-lg p-4
            shadow-[0_4px_20px_rgba(255,255,255,0.25)]
            flex flex-col
          "
        >
          <h2 className="text-white text-xl font-bold mb-4 border-b border-gray-600 pb-2">
            Admin Menu
          </h2>

          <Link
            to="addproduct"
            className="text-white text-lg px-4 py-2 rounded-md
              hover:bg-blue-700 transition shadow-sm"
          >
            ➕ Add Product
          </Link>

          <Link
            to="orderproduct"
            className="text-white text-lg px-4 py-2 rounded-md
              hover:bg-blue-700 transition shadow-sm"
          >
            ➕ Orders
          </Link>

          <Link
            to="productlist"
            className="text-white text-lg px-4 py-2 rounded-md
              hover:bg-blue-700 transition shadow-sm"
          >
            ➕ Product Lists
          </Link>

        </aside>

        {/* ===== RIGHT DATA AREA ===== */}
        <main
          className="
            flex-1 bg-gray-800 rounded-lg 
            p-4 sm:p-6
            shadow-[0_4px_20px_rgba(255,255,255,0.25)]
            overflow-auto
          "
        >
          <Outlet />
        </main>

      </div>
    </section>
  );
};

export default AdminDashboard;






# new admin dashboard

import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/bookLogo.png";

const AdminDashboard = () => {
  return (
    <section className="min-h-screen w-full bg-[#d8ccb6] flex">

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-[240px] bg-[#203056] text-gray-200 flex flex-col px-4 py-6">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <div className="text-3xl font-bold">BookHunt</div>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 text-sm">

          <NavLink
            to="addproduct"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive ? "bg-white text-black font-semibold" : "hover:bg-slate-800"}`
            }
          >
            🏷️ Add Product
          </NavLink>

          <NavLink
            to="orderproduct"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive ? "bg-white text-black font-semibold" : "hover:bg-slate-800"}`
            }
          >
            📦 Orders
          </NavLink>

          <NavLink
            to="productlist"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive ? "bg-white text-black font-semibold" : "hover:bg-slate-800"}`
            }
          >
            📋 Product List
          </NavLink>

        </nav>

        {/* FOOTER */}
        <div className="mt-auto text-xs text-gray-400 px-2">
          © 2026 BookHunt
        </div>
      </aside>

      {/* ===== RIGHT CONTENT ===== */}
      <main className="flex-1 p-6">

        {/* PAGE TITLE */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Manage products, orders and listings
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-[calc(100vh-140px)]">
          <Outlet />
        </div>

      </main>
    </section>
  );
};

export default AdminDashboard;






# old order page.. 
import axios from "axios";
import React, { useEffect, useState } from "react";
axios

const Orders = () => {
  const [mydata, setmydata] = useState([]);

  const loadData = async (req, res) => {
    let api = `${import.meta.env.VITE_BACKURL}/product/getorder`;
    const response = await axios.get(api);
    console.log(response.data.order);
    setmydata(response.data.order)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="text-white p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6 text-white">Orders</h1>

      <table className="text-white w-full border text-center">
        <thead>
          <tr>
            <th className="text-white border p-2">Buyer Name</th>
            <th className="text-white border p-2">Products</th>
            <th className="text-white border p-2">Quantity</th>
            <th className="text-white border p-2">Total Price</th>
            <th className="text-white border p-2">Alternate Address</th>
            <th className="text-white border p-2">Instructions</th>
          </tr>
        </thead>

        <tbody>
          {mydata.length > 0 ? 
            (mydata.map((key, idx) => (
              <tr key={idx}>
                <td className="text-white border p-2">{key.name}</td>

                <td className="text-white border p-2">
                  {key.products.map((item, i) => (
                    <div key={i}>{item.name}</div>
                  ))}
                </td>

                <td className="text-white border p-2">
                  {key.products.map((item, i) => (
                    <div key={i}>pro quantity : {item.quantity}</div>
                  ))}
                </td>

                <td className="text-white border p-2">₹{key.totalPrice}</td>

                <td className="text-white border p-2">
                  {key.userId?.alternateaddress || "-"}
                </td>

                <td className="text-white border p-2">
                  {key.userId?.instructions || "-"}
                </td>
              </tr>
            ))
            ): 
            <div className="min-h-[50vh]">
              no product ordered yet. 
            </div>
          }
          
        </tbody>
      </table>

    </div>
  );
};

export default Orders; 











# old product list page 

import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [mydata, setmydata] = useState([]);
  const [newdata, setnewdata] = useState([]);
  const [searchone, setsearchone] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  /* ---------------- SEARCH ---------------- */
  const handlesearchone = async () => {
    if (!searchone.trim()) {
      setnewdata([]);
      return;
    }
    const api = `${import.meta.env.VITE_BACKURL}/admin/searchproduct`;
    const res = await axios.post(api, { search: searchone });
    setnewdata(res.data);
  };

  /* ---------------- LOAD DATA ---------------- */
  const loadData = async () => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/showproduct`;
    const res = await axios.get(api);
    setmydata(res.data.myproduct);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!searchone.trim()) setnewdata([]);
  }, [searchone]);

  const displayData = newdata.length > 0 ? newdata : mydata;

  /* ---------------- EDIT ---------------- */
  const myEdit = (id) => {
    const selected = displayData.find((p) => p._id === id);
    setEditId(id);
    setEditData(selected);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/productupdate?id=${id}`;
    await axios.put(api, editData);
    setEditId(null);
    loadData();
  };

  const myDel = async (id) => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/productdelete?id=${id}`;
    await axios.delete(api);
    loadData();
  };

  /* ---------------- TABLE ROWS ---------------- */
  const rows = displayData.map((item) => (
    <tr key={item._id} className="border-b border-gray-700">
      {/* PRODUCT NAME */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <input
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
          />
        ) : (
          item.name
        )}
      </td>

      {/* CATEGORY */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <select
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
          >
            <option>Books</option>
            <option>Novels</option>
            <option>Pens & Pencils</option>
            <option>Notebooks</option>
          </select>
        ) : (
          item.category
        )}
      </td>

      {/* DESCRIPTION (WIDEST) */}
      <td className="p-3 align-top border border-gray-600">
        <div className="h-[140px] overflow-hidden">
          {editId === item._id ? (
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full h-full bg-gray-800 text-white px-2 py-1 rounded resize-none"
            />
          ) : (
            <p className="text-sm leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </td>

      {/* PRICE */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <input
            type="number"
            value={editData.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
          />
        ) : (
          `₹${item.price}`
        )}
      </td>

      {/* IMAGE */}
      <td className="p-3 align-top border border-gray-600">
        <img
          src={item.defaultImage}
          alt=""
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      {/* ACTION */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => saveEdit(item._id)}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => myEdit(item._id)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => myDel(item._id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm mt-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Product Management
      </h2>

      {/* SEARCH */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search product..."
          value={searchone}
          onChange={(e) => setsearchone(e.target.value)}
          className="bg-white text-black px-3 py-2 rounded w-64"
        />
        <button
          onClick={handlesearchone}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full table-fixed border border-gray-600">
        {/* 🔑 COLUMN WIDTH CONTROL */}
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[12%]" />
          <col className="w-[36%]" />
          <col className="w-[8%]" />
          <col className="w-[10%]" />
          <col className="w-[16%]" />
        </colgroup>

        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left border border-gray-600">Product Name</th>
            <th className="p-3 text-left border border-gray-600">Category</th>
            <th className="p-3 text-left border border-gray-600">Description</th>
            <th className="p-3 text-left border border-gray-600">Price</th>
            <th className="p-3 text-left border border-gray-600">Image</th>
            <th className="p-3 text-left border border-gray-600">Action</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default ProductList;


