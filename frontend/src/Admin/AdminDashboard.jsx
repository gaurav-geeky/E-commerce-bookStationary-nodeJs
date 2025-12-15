
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="min-h-screen w-full bg-gray-900 px-2 pt-4">

      {/* ===== HEADER ===== */}
      <header
        className="text-white text-2xl sm:text-4xl font-black 
        w-full bg-gray-800 p-4 rounded-lg
        shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:text-left"
      >
        Welcome To AdminDashBoard
      </header>

      {/* ===== CONTENT ===== */}
      <div
        className="
          flex flex-col md:flex-row
          mt-4 gap-4
          min-h-[calc(100vh-110px)]
        "
      >

        {/* ===== LEFT MENU ===== */}
        <aside
          className="
            w-full md:w-[22%] lg:w-[18%]
            bg-gray-800 rounded-lg p-4
            shadow-[0_4px_20px_rgba(255,255,255,0.25)]
            flex flex-col
          "
        >
          <h2 className="text-white text-xl font-bold mb-4 border-b border-gray-600 pb-2">
            Admin Menu
          </h2>

          <Link
            to="addproduct"
            className="text-white text-lg px-4 py-2 rounded-md
              hover:bg-blue-700 transition shadow-sm"
          >
            ➕ Add Product
          </Link>
        </aside>

        {/* ===== RIGHT DATA AREA ===== */}
        <main
          className="
            flex-1 bg-gray-800 rounded-lg 
            p-4 sm:p-6
            shadow-[0_4px_20px_rgba(255,255,255,0.25)]
            overflow-auto
          "
        >
          <Outlet />
        </main>

      </div>
    </section>
  );
};

export default AdminDashboard;
