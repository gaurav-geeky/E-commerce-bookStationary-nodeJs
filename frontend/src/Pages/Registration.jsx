
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Registration = () => {
  const [input, setInput] = useState({})
  const navigate = useNavigate()

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let api = `${import.meta.env.VITE_BACKURL}/product/registration`
    const response = await axios.post(api, input)
    alert(response.data.msg);
    console.log(response.data);
  }

  return (
    <>
      {/* PAGE WRAPPER */}
      <section className="min-h-screen w-full bg-gray-900 pt-6 px-3 sm:px-4 pb-24">

        {/* HEADER */}
        <header className="text-white text-xl sm:text-3xl font-black w-full max-w-7xl mx-auto bg-gray-800 p-3 rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]">
          Welcome to User Registration Page
        </header>

        {/* CARD */}
        <div className="bg-gray-800 mx-auto mt-8 w-full max-w-[450px] rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.25)]" >

          {/* FORM */}
          <form className="flex flex-col gap-5 w-full px-4 sm:px-10 py-6" >

            {/* NAME */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* CONTACT */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* CITY */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter City
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* PINCODE */}
            <div>
              <label className="text-blue-500 text-base block mb-1">
                Enter Pincode
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="w-full bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-blue-500 py-2"
                onChange={handleInput}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-8 rounded-full mt-6 self-center transition" onClick={handleSubmit}
            >
              Registeration
            </button>

          </form>
        </div>
      </section>
    </>
  )
}

export default Registration;


