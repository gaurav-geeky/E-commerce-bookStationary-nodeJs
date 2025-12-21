

import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

import Nav from 'react-bootstrap/Nav';


const Header = () => {

  const myData = useSelector(state => state.mycart.cart);
  const proLength = myData.length;
  const [open, setOpen] = useState(false);   // 👈 add this

  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };

  }, []);


  return (
    <header className="w-full shadow-md bg-white">

      {/* TOP BAR */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 ">

        {/* Logo */}
        <p className="text-4xl font-bold tracking-wider text-blue-700">
          BookHunt
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-1/2 border rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search products…"
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-orange-500 px-4 py-2">
            <FaSearch className="text-white" />
          </button>
        </div>


        {/* Icons */}
        <div className="flex items-center justify-end gap-6">

          <div className="relative" ref={dropdownRef}>
            {/* BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 hover:text-blue-600" >
              <FaUser />
              <span className="hidden sm:inline">Account</span>
            </button>

            {/* dropdown for signup and login */}
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                <Nav.Link as={Link} to="/registration"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)} >
                  Signup
                </Nav.Link>

                <Nav.Link as={Link} to="/login"
                  className=" px-4 py-2"
                  onClick={() => setOpen(false)} >
                  Login
                </Nav.Link>
              </div>
            )}
          </div>


          <button className="relative hover:text-blue-600">
            <Nav.Link as={Link} to="/mycart" className="">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
                {proLength}
              </span>
            </Nav.Link>
          </button>

        </div>

      </div>

      {/* MENU BAR */}
      <nav className="bg-gray-900">
        <Nav className="justify-center gap-6 py-3 text-sm font-medium">

          <Nav.Link as={Link} to="/home" className="text-white"> HOME </Nav.Link>
          <Nav.Link as={Link} to="/book" className="text-white"> BOOKS </Nav.Link>
          <Nav.Link as={Link} to="/novels" className="text-white"> NOVELS </Nav.Link>
          <Nav.Link as={Link} to="/notebooks" className="text-white"> NOTEBOOKS </Nav.Link>
          <Nav.Link as={Link} to="/" className="text-white"> PENS & PENCILS </Nav.Link>
          <Nav.Link as={Link} to="/mycart" className="text-white"> CART </Nav.Link>
        </Nav>
      </nav>

    </header>
  );
};

export default Header;



