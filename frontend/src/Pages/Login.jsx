
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useEffect } from 'react';

const Login = () => {
    const initial = { email: "", password: "" };
    const [input, setInput] = useState(initial)
    const navigate = useNavigate()

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));

    }

    //  to check where login detail match in registration 
    const handleSubmit = async (e) => {
        e.preventDefault()
        let api = `${import.meta.env.VITE_BACKURL}/product/login`
        const response = await axios.post(api, input)
        alert(response.data.msg);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setInput(initial);
    }

    const mytoken = localStorage.getItem("token");

    // auth function for token
    const Authenticate = async () => {
        if (!mytoken) return;
        let api = `${import.meta.env.VITE_BACKURL}/product/auth`;

        const response = await axios.get(api, {
            headers: { "auth-token": mytoken }
        });

        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("address", response.data.user.shippingadd);
        localStorage.setItem("userid", response.data.user._id);
        console.log(response.data);
        // alert(response.data.msg);  
        navigate("/home");
    }

    useEffect(() => {
        Authenticate();
    }, []);


    return (
        <>
            {/* PAGE WRAPPER */}
            <section className="min-h-screen w-full bg-gray-800 pt-6 px-3 sm:px-4 pb-24">

                {/* HEADER */}
                <header className="text-white text-xl sm:text-3xl font-black w-full max-w-7xl mx-auto bg-gray-700 p-3 rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]">
                    Welcome to User Login Page
                </header>

                {/* CARD */}
                <div className="bg-gray-800 mx-auto mt-8 w-full max-w-[450px] rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]" >

                    {/* FORM */}
                    <form className="flex flex-col gap-5 w-full px-4 sm:px-10 py-6" >

                        {/* EMAIL */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                placeholder="Email"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                                onChange={handleInput}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                placeholder="password"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                                onChange={handleInput}
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-8 rounded-full mt-6 self-center transition" onClick={handleSubmit}
                        >
                            Login
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;


