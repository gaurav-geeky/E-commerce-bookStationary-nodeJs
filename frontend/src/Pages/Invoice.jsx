import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/bookLogo.png";
import "../css/Invoice.css"

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const api = `${import.meta.env.VITE_BACKURL}/product/getinvoice/${orderId}`;
                const res = await axios.get(api);
                console.log(res);
                setOrder(res.data.order);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (!order) {
        return <p style={{ textAlign: "center" }}>Loading invoice...</p>;
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div
                className="max-w-3xl mx-auto bg-white p-8 shadow-md border">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        <h2 className="text-xl font-bold text-gray-800">BookHunt</h2>
                    </div>
                    <div className="text-4xl font-bold text-green-600 tracking-wide">
                        INVOICE
                    </div>
                </div>

                {/* ORDER DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <p className="text-gray-500">Order ID</p>
                        <p className="font-medium">{order._id}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Customer Name</p>
                        <p className="font-medium">{order.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Order Status</p>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            {order.orderStatus}
                        </span>
                    </div>
                </div>

                <hr />

                {/* PRODUCTS */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Products</h3>

                    <div className="space-y-3">
                        {order.products.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b pb-2 text-sm"
                            >
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-600">
                                    Qty: <b>{item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOTAL */}
                <div className="mt-8 flex justify-between items-center border-t pt-4">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">
                        ₹{order.totalPrice}
                    </span>
                </div>

                {/* FOOTER */}
                <div className="mt-10 text-center text-xs text-gray-500">
                    <p>Thank you for shopping with BookHunt 📚</p>
                    <p>This is a system-generated invoice.</p>
                </div>
            </div>

            {/*  Print Button */}
            <div className="text-center mt-6 no-print">
                <button
                    onClick={handlePrint}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                    Print / Download Invoice
                </button>
            </div>

        </div>
    );

};

export default Invoice;
