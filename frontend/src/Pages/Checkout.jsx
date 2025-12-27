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
    let proId = "";

    cart.forEach((item) => {
        totalAmount += item.price * item.qnty;
        proName += item.name + ", ";
        myImg = item.image;
        proId = item.id;
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

                    const orderURL = `${import.meta.env.VITE_BACKURL}/product/saveorder`;

                    const resorder = await axios.post(orderURL, {
                        totalPro: totalProducts,
                        totalQty: totalQuantity, 
                        userid: Id, 
                    })
                    console.log(resorder.data); 

                } 
                catch (error) {
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


