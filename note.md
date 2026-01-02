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