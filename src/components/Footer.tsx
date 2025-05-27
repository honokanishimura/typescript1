import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faInstagram,
  faPinterest,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#fffced] text-gray-700 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">HYO</h2>
          <p className="text-sm">
            Timeless comfort meets modern design.<br />Make your space feel like home.
          </p>
          <div className="flex space-x-4 mt-4 text-gray-600">
            
          <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
<a href="https://pinterest.com"><FontAwesomeIcon icon={faPinterest} /></a>
<a href="https://facebook.com"><FontAwesomeIcon icon={faFacebookF} /></a>
<a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>


          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800">Shop</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <li><a href="/category/sofa" className="hover:text-orange-500">Sofas</a></li>
            <li><a href="/category/chair" className="hover:text-orange-500">Chairs</a></li>
            <li><a href="/category/table" className="hover:text-orange-500">Tables</a></li>
            <li><a href="/category/rug" className="hover:text-orange-500">Rugs</a></li>
            <li><a href="/category/mirror" className="hover:text-orange-500">Mirrors</a></li>
            <li><a href="/category/tvstand" className="hover:text-orange-500">TV Stands</a></li>
            <li><a href="/category/plants" className="hover:text-orange-500">Plants</a></li>
            <li><a href="/category/curtain" className="hover:text-orange-500">Curtains</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800">Customer Service</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-orange-500">Shipping & Delivery</li>
            <li className="hover:text-orange-500">Returns</li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800">About</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-orange-500">Our Story</li>
            <li className="hover:text-orange-500">Sustainability</li>
            <li className="hover:text-orange-500">Join Us</li>
            <li className="text-xs text-gray-500 mt-4">
              Open Hours:<br />
              Mon–Fri: 10am–6pm EST<br />
              Sat–Sun: 10am–2pm
            </li>
          </ul>
        </div>
        </div>

      <div className="text-xs text-center text-gray-400 mt-6">
        © 2025 HYO Furniture. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
