import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";


const Header = () => {
    return (
        <>

            <header className="w-full shadow-md">

                {/* ---------------- TOP BAR ---------------- */}
                <div className="w-full flex items-center justify-between px-6 bg-white">
                    {/* Logo */}
                    <h1 className="text-3xl font-bold tracking-wide">
                        <span className="text-blue-700">BookHunt</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="flex items-center w-1/2 border rounded-full overflow-hidden shadow-sm">
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
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                            <FaUser /> <span>Sign In</span>
                        </button>

                        <button className="relative hover:text-blue-600">
                            <FaShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* ---------------- MENU BAR ---------------- */}
                <nav className="w-full bg-gray-900 text-white">
                    <ul className="flex items-center justify-center gap-10 py-3 text-sm font-medium">
                        <li className="hover:text-orange-400 cursor-pointer">HOME</li>
                        <li className="hover:text-orange-400 cursor-pointer">BOOKS</li>
                        <li className="hover:text-orange-400 cursor-pointer">NOVELS</li>
                        <li className="hover:text-orange-400 cursor-pointer">NOTEBOOKS</li>
                        <li className="hover:text-orange-400 cursor-pointer">PENS & PENCILS</li>
                        <li className="hover:text-orange-400 cursor-pointer">GEOMETRY</li>
                        <li className="hover:text-orange-400 cursor-pointer">STATIONERY</li>
                        <li className="hover:text-orange-400 cursor-pointer">ART SUPPLIES</li>
                        <li className="hover:text-orange-400 cursor-pointer">SALE</li>
                    </ul>
                </nav>
            </header>

        </>
    );
}
export default Header; 
