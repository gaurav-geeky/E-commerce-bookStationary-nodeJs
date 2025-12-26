import { FaWhatsapp, FaPhone } from "react-icons/fa";
import google from "../images/google.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">

          {/* BRAND */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3">
              BookHunt
            </h2>

            <div className="flex items-start gap-2 text-sm sm:text-base mb-2">
              <FaWhatsapp className="mt-1 text-green-400" />
              <span>
                WhatsApp <br /> +1 908-145-4307
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm sm:text-base">
              <FaPhone className="mt-1 text-blue-400" />
              <span>
                Call Us <br /> +1 908-145-4307
              </span>
            </div>

            <img
              src={google}
              alt="Google Play"
              className="h-8 sm:h-10 mt-4 cursor-pointer"
            />
          </div>

          {/* CATEGORIES */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
              Categories
            </h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li>Novels</li>
              <li>Office Supplies</li>
              <li>Notebooks</li>
              <li>Craft Material</li>
              <li>Stickers</li>
              <li>Highlighters</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
              Customer Services
            </h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li>About Us</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Track Order</li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-3 text-center text-xs sm:text-sm text-gray-400">
        © 2025 BookHunt Retail Ltd. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
