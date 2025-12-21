import { FaWhatsapp, FaPhone } from "react-icons/fa";
import google from "../images/google.png"

const Footer = () => {
  return (
    <section className="w-full bg-gray-900 text-white">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* ---------------- Contact Section ---------------- */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">BookHunt</h1>

            <h4 className="text-xl font-semibold mt-4">Contact Us</h4>

            <p className="flex items-start gap-2">
              <FaWhatsapp className="mt-1" />
              <span>
                Whats App <br />
                +1&nbsp;908-145-4307
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaPhone className="mt-1" />
              <span>
                Call Us <br />
                +1&nbsp;908-145-4307
              </span>
            </p>

            <div>
              <h4 className="text-lg font-semibold mb-2">Download App</h4>
              <div className="flex gap-3">
                <img 
                  src={google}
                  alt="Google Play"
                  className="h-10 cursor-pointer "
                />
              </div>
            </div>
          </div>

          {/* ---------------- Categories Section ---------------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 underline">
              Most Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>Novels</li>
              <li>Office Supplies</li>
              <li>Craft Material</li>
              <li> Notebooks</li>
              <li>Notepads suit</li>
              <li>Book Covers</li>
              <li> Stickers</li>
              <li> Highlighters</li>
            </ul>
          </div>

          {/* ---------------- Services Section ---------------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 underline">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Cancellation Policy</li>
              <li>Refund Policy</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/40"></div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm">
        © 2025 All rights reserved. BookHunt Retail Ltd.
      </div>
    </section>
  );
};

export default Footer;
