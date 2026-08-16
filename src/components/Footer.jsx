import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-800 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo className="[&_span:last-child]:text-white [&_span_span]:text-copper-300" />
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              Premium apparel manufacturing &amp; global fashion solutions.
              Shaping the future of fashion since 2005.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link to="/catalog" className="hover:text-copper-300">Full Catalog</Link></li>
              <li><Link to="/catalog?deal=hot" className="hover:text-copper-300">Hot Deals</Link></li>
              <li><Link to="/cart" className="hover:text-copper-300">Your Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li><Link to="/about" className="hover:text-copper-300">About &amp; Partners</Link></li>
              <li><Link to="/contact" className="hover:text-copper-300">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-copper-300">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>C-112, Sector 63, Gautam Buddh Nagar,<br />Noida, Uttar Pradesh, 201301, India</li>
              <li><a href="tel:+919811230091" className="hover:text-copper-300">+91 98112 30091</a></li>
              <li><a href="mailto:shivamdhingra03@gmail.com" className="hover:text-copper-300">shivamdhingra03@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-700 pt-6 text-center text-xs text-navy-300">
          © {new Date().getFullYear()} Shakti Arts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
