import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
    const [input, setinput] = useState({});

    const handleinput = () => {

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let api = `${import.meta.env.VITE_BACKURL}/admin/login`;
        const response = await axios.post(api, { adminemail: adminemail, password: password })
        console.log(response);
        alert(response.data);
        navigate("/admindash");
    }

    return (
        <>
            <section className="min-h-screen w-full bg-gray-900 pt-6 px-4">

                {/* Header (unchanged position) */}
                <header className="text-white text-xl sm:text-3xl font-black  w-full max-w-7xl mx-auto bg-gray-800 p-3 rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]">
                    Welcome to User Registration  Page
                </header>

                {/* Register Card */}
                <div className="bg-gray-800 mx-auto mt-8 max-w-[420px] rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)] ">


                    {/* 🔹 Form width reduced */}
                    <form className="flex flex-col gap-5 px-3 pb-4 max-w-[350px] mx-auto">

                        {/* name */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Name
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* email */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* contact */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Contact
                            </label>
                            <input
                                type="text"
                                placeholder="Contact"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter City
                            </label>
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Address
                            </label>
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* pincode */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter pincode
                            </label>
                            <input
                                type="text"
                                placeholder="pincode"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={handleinput}
                            />
                        </div>

                        {/* 🔹 Button smaller + pushed down */}
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-full mt-4 self-center transition"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Registration;

