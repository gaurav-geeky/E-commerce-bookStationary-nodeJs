import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AdminLogin = () => {
    const [adminemail, setAdminemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                    Welcome to Admin Login Page
                </header>

                {/* Login Card */}
                <div className="bg-gray-800 mx-auto mt-16 w-full max-w-sm rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]">

                    <div className="text-3xl font-bold text-white text-center py-4">
                        Login here
                    </div>

                    {/* 🔹 Form width reduced */}
                    <form className="flex flex-col gap-5 px-3 pb-8 max-w-[350px] mx-auto">

                        {/* Email */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={(e) => { setAdminemail(e.target.value) }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-blue-500 text-base block mb-1">
                                Enter Password
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-1"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        {/* 🔹 Button smaller + pushed down */}
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1 px-6 rounded-full mt-4 self-center transition"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default AdminLogin;

