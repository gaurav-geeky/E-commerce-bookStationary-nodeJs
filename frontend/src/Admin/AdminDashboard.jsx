

import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/bookLogo.png";

const AdminDashboard = () => {
  return (
    <section className="min-h-screen w-full bg-[#d8ccb6] flex">

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-[240px] bg-blue-900 text-gray-200 flex flex-col px-4 py-6">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <div className="text-2xl font-bold">BookHunt</div>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 text-sm">

          <NavLink
            to="addproduct"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `text-white text-[16px] flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive
                ? "bg-white !text-black font-semibold" :
                "hover:bg-blue-700"}`
            }
          >
            🏷️ Add Product
          </NavLink>

          <NavLink
            to="orderproduct"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `text-white text-[16px] flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive
                ? "bg-white !text-black font-semibold" :
                "hover:bg-blue-700"}`
            }
          >
            📦 Orders
          </NavLink>

          <NavLink
            to="productlist"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              `text-white text-[16px] flex items-center gap-3 px-4 py-3 rounded-lg transition 
              ${isActive
                ? "bg-white !text-black font-semibold" :
                "hover:bg-blue-700"}`
            }
          >
            📋 Product List
          </NavLink>

        </nav>

        {/* FOOTER */}
        <div className="mt-auto text-xs text-gray-400 px-2">
          © 2026 BookHunt
        </div>
      </aside>

      {/* ===== RIGHT CONTENT ===== */}
      <main className="flex-1 p-6">

        {/* PAGE TITLE */}
        <div className="mb-4">
          <div className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </div>
          <p className="text-lg text-gray-600">
            Manage products, orders and listings
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-[calc(100vh-140px)]">
          <Outlet />
        </div>

      </main>
    </section>
  );
};

export default AdminDashboard;





// import { Link, Outlet } from "react-router-dom";
// import "../css/Header.css";
// import logo from "../assets/bookLogo.png";

// const AdminDashboard = () => {
//   return (
//     <section className="min-h-screen w-full bg-gray-900 px-2 pt-4">

//       {/* ===== HEADER ===== */}
//       <header
//         className="text-white text-2xl sm:text-4xl font-black
//         w-full bg-gray-800 p-4 rounded-lg
//         shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:text-left"
//       >
//         Welcome To Admin DashBoard

//         <div className="logo">
//           <img src={logo} alt="logo" /> BookHunt
//         </div>

//       </header>

//       {/* ===== CONTENT ===== */}
//       <div
//         className="
//           flex flex-col md:flex-row
//           mt-4 gap-4
//           min-h-[calc(100vh-110px)]
//         "
//       >

//         {/* ===== LEFT MENU ===== */}
//         <aside
//           className="
//             w-full md:w-[22%] lg:w-[18%]
//             bg-gray-800 rounded-lg p-4
//             shadow-[0_4px_20px_rgba(255,255,255,0.25)]
//             flex flex-col
//           "
//         >
//           <h2 className="text-white text-xl font-bold mb-4 border-b border-gray-600 pb-2">
//             Admin Menu
//           </h2>

//           <Link
//             to="addproduct"
//             className="text-white text-lg px-4 py-2 rounded-md
//               hover:bg-blue-700 transition shadow-sm"
//           >
//             ➕ Add Product
//           </Link>

//           <Link
//             to="orderproduct"
//             className="text-white text-lg px-4 py-2 rounded-md
//               hover:bg-blue-700 transition shadow-sm"
//           >
//             ➕ Orders
//           </Link>

//           <Link
//             to="productlist"
//             className="text-white text-lg px-4 py-2 rounded-md
//               hover:bg-blue-700 transition shadow-sm"
//           >
//             ➕ Product Lists
//           </Link>

//         </aside>

//         {/* ===== RIGHT DATA AREA ===== */}
//         <main
//           className="
//             flex-1 bg-gray-800 rounded-lg
//             p-4 sm:p-6
//             shadow-[0_4px_20px_rgba(255,255,255,0.25)]
//             overflow-auto
//           "
//         >
//           <Outlet />
//         </main>

//       </div>
//     </section>
//   );
// };

// export default AdminDashboard;