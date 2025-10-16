import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// Contact function to open WhatsApp
const openWhatsApp = () => {
  const phoneNumber = '+254755139294';
  const message = encodeURIComponent('Hello, I\'m interested in your roofing products. Can you provide more information?');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

const navItems = [
  { name: 'Home', path: '/', action: null },
  { name: 'Products', path: '/#products', action: null },
  { name: 'Gallery', path: '/#gallery', action: null },
  { name: 'About Us', path: '/about', action: null },
  { name: 'Contact', path: '#', action: openWhatsApp },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-3'
      }`}
    >
      {/* Top Bar with contact info */}
      <div className="hidden lg:block bg-blue-700 text-white py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+254755139294" className="flex items-center text-sm hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +254 755 139 294
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm hover:text-blue-200 transition-colors">Find a Branch</a>
            <a href="#" className="text-sm hover:text-blue-200 transition-colors">FAQ</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 py-1 z-10">
            <img 
              src="https://www.royalmabati.com/cdn/shop/files/Asset_45.png?v=1718101941&width=200" 
              alt="Royal Mabati Logo" 
              className="h-14 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative group text-gray-700 hover:text-blue-700`}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    layoutId="navigation-underline"
                  />
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                    pathname === item.path
                      ? 'text-blue-700'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                      pathname === item.path ? 'scale-x-100' : ''
                    }`}
                    layoutId="navigation-underline"
                  />
                </Link>
              )
            ))}
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button 
              onClick={openWhatsApp}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </button>
          </div>

          {/* Call Button with heartbeat animation - Always Visible on Mobile */}
          <a
            href="tel:+254755139294"
            className="md:hidden flex items-center mr-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors px-4 py-2 space-x-2"
            aria-label="Call Us"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="flex items-center"
            >
              <Phone className="w-4 h-4" />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                className="text-xs font-semibold text-red-100 leading-tight"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                Call Us
              </motion.span>
              <span className="text-xs font-medium">+254 755 139 294</span>
            </div>
          </a>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2">
            {navItems.map((item) => (
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="block py-3 px-4 border-b border-gray-100 text-gray-700 text-left w-full"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-3 px-4 border-b border-gray-100 ${
                    pathname === item.path ? 'text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="py-4 space-y-3">
              <button
                onClick={openWhatsApp}
                className="block w-full bg-blue-700 text-white text-center px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                Contact Us
              </button>
              <a 
                href="tel:+254755139294" 
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  );
};