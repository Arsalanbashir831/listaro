import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-800 py-12">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="leading-relaxed">
              We are committed to delivering AI-driven solutions that empower
              businesses to achieve their goals. Join us on our mission to
              transform the future of technology.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="hover:text-purple-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-purple-300 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-purple-300 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-purple-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe</h3>
            <p className="mb-4">
              Stay updated with our latest news and AI solutions.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:ring focus:ring-purple-400 focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-r-lg hover:bg-purple-700 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-purple-700 pt-6 text-center text-purple-300">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
