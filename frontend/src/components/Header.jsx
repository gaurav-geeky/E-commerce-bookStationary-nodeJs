

import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const myData = useSelector(state => state.mycart.cart);
  const proLength = myData.length;

  return (
    <header className="w-full shadow-md bg-white">

      {/* TOP BAR */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-3">

        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-widest text-blue-700">
          BookHunt
        </h1>

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
          <button className="flex items-center gap-1 hover:text-blue-600">
            <FaUser /> <span className="hidden sm:inline">Sign In</span>
          </button>

          <button className="relative hover:text-blue-600">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
              {proLength}
            </span>
          </button>
        </div>
      </div>

      {/* MENU BAR */}
      <nav className="bg-gray-900 text-white">
        <ul className="flex flex-wrap justify-center gap-6 py-3 text-sm font-medium">
          <li><Link to="/home">HOME</Link></li>
          <li><Link to="/book">BOOKS</Link></li>
          <li><Link to="/novels">NOVELS</Link></li>
          <li><Link to="/notebooks">NOTEBOOKS</Link></li>
          <li><Link to="/">PENS & PENCILS</Link></li>
          <li><Link to="/mycart">CART</Link></li>
          <li><Link to="/registration">REGISTRATION</Link></li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;






// import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom";

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// import { useSelector } from "react-redux";


// const Header = () => {

//     const myData = useSelector(state => state.mycart.cart); 
//     console.log(myData); 
//     const proLength = myData.length;  
//     return (
//         <>

//             <header className="w-full shadow-md">

//                 {/* ---------------- TOP BAR ---------------- */}
//                 <div className="w-full flex items-center justify-between px-6 bg-white">
//                     {/* Logo */}
//                     <h1 className="text-3xl font-bold tracking-wide">
//                         <span className="text-blue-700">BookHunt</span>
//                     </h1>

//                     {/* Search Bar */}
//                     <div className="flex items-center w-1/2 border rounded-full overflow-hidden shadow-sm">
//                         <input
//                             type="text"
//                             placeholder="Search products…"
//                             className="w-full px-4 py-2 outline-none"
//                         />
//                         <button className="bg-orange-500 px-4 py-2">
//                             <FaSearch className="text-white" />
//                         </button>
//                     </div>

//                     {/* Icons */}
//                     <div className="flex items-center gap-6">
//                         <button className="flex items-center gap-1 hover:text-blue-600">
//                             <FaUser /> <span>Sign In</span>
//                         </button>

//                         <button className="relative hover:text-blue-600">
//                             <FaShoppingCart size={20} />
//                             <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
//                                 {proLength}
//                             </span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* ---------------- MENU BAR ---------------- */}
//                 <Navbar bg="dark" variant="dark" className="py-0">
//                     <Container>
//                         <Nav className="mx-auto gap-10 py-3 text-sm font-medium [&_a:hover]:text-orange-400">
//                             <Nav.Link as={Link} to="/home"> HOME </Nav.Link>
//                             <Nav.Link as={Link} to="/book"> BOOKS </Nav.Link>
//                             <Nav.Link as={Link} to="/novels"> NOVELS </Nav.Link>
//                             <Nav.Link as={Link} to="/notebooks"> NOTEBOOKS </Nav.Link>
//                             <Nav.Link as={Link} to="/"> PENS & PENCILS </Nav.Link>
//                             <Nav.Link as={Link} to="/mycart"> CART </Nav.Link>
//                             <Nav.Link as={Link} to="/registration"> REGISTRATION </Nav.Link>
//                         </Nav>
//                     </Container>
//                 </Navbar>


//                 {/* ---------------- MENU BAR ---------------- */}

//             </header>

//         </>
//     );
// }
// export default Header; 
