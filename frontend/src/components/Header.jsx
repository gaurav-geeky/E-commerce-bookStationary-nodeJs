import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import "../css/Header.css";
import logo from "../assets/bookLogo.png";

const Header = ({ setSearchQuery }) => {
  const myData = useSelector((state) => state.mycart.cart);
  const proLength = myData.length;

  const [open, setOpen] = useState(false);          // account dropdown
  const [menuOpen, setMenuOpen] = useState(false); // hamburger menu

  const dropdownRef = useRef();
  const name = localStorage.getItem("name");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  return (
    <header className="header">
      {/* ================= TOP BAR ================= */}
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="logo" /> BookHunt
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products…"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </div>

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

      {/* ================= MENU BAR ================= */}
      <nav className="menu-bar">
        <div className="menu-left">
          {/* HAMBURGER (MOBILE) */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>

          {/* LINKS */}
          <div className={`menu-links ${menuOpen ? "open" : ""}`}>
            <Nav.Link as={Link} to="/home" onClick={() => setMenuOpen(false)}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/book" onClick={() => setMenuOpen(false)}>BOOKS</Nav.Link>
            <Nav.Link as={Link} to="/novels" onClick={() => setMenuOpen(false)}>NOVELS</Nav.Link>
            <Nav.Link as={Link} to="/notebooks" onClick={() => setMenuOpen(false)}>NOTEBOOKS</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setMenuOpen(false)}>PENS & PENCILS</Nav.Link>
            <Nav.Link as={Link} to="/mycart" onClick={() => setMenuOpen(false)}>CART</Nav.Link>
          </div>
        </div>

        {name && <div className="welcome">Welcome {name}</div>}
      </nav>
    </header>
  );
};

export default Header;

