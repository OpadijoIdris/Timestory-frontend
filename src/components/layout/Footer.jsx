import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        {/* ---------------- Brand ---------------- */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Timestory</h2>
          <p className="text-slate-400">
            Where Moments Become Timeless Stories. Shop luxury jewelry and lifestyle products crafted with care.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-indigo-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* ---------------- Shop ---------------- */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition">All Products</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Rings</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Necklaces</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Bracelets</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Earrings</a></li>
          </ul>
        </div>

        {/* ---------------- Support ---------------- */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Payment Options</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* ---------------- Newsletter ---------------- */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-slate-400 mb-4">
            Subscribe to get updates on new arrivals, exclusive offers, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex-1"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ---------------- Bottom Bar ---------------- */}
      <div className="border-t border-slate-800 mt-8 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Timestory. All rights reserved.
      </div>
    </footer>
  );
}
