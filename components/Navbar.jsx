import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for mobile menu

const Navbar = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page loads scrolled
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    // { name: 'Contact', href: '#contact' }, // Can use button instead
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
     setIsMobileMenuOpen(false);
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-primary-bg/95 backdrop-blur-md shadow-sm border-b border-accent-secondary' : 'bg-transparent border-b border-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="#home" legacyBehavior>
              <a className="flex items-center group focus:outline-none" aria-label="Devasoft Home">
                 <Image 
                    src="/images/devasoft-logo.png"
                    alt="Devasoft Logo"
                    width={140} // Slightly smaller for navbar
                    height={35} 
                    className="h-auto transition-opacity duration-200" 
                 />
              </a>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} legacyBehavior>
                 <a 
                   className="text-text-body hover:text-accent-primary transition-colors duration-200 text-sm font-medium"
                   onClick={closeMobileMenu} // Close menu on click if somehow open
                  >
                    {link.name}
                 </a>
              </Link>
            ))}
            {/* Consultation Button (Desktop) */}
            <button 
                onClick={onOpenConsultation}
                className="btn-secondary text-sm px-4 py-1.5 ml-4" // Smaller secondary button
            >
                Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-body hover:text-accent-primary hover:bg-secondary-bg focus:outline-none transition duration-150 ease-in-out"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
          {isMobileMenuOpen && (
             <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden bg-secondary-bg border-t border-accent-secondary overflow-hidden shadow-lg"
             >
                 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} legacyBehavior>
                            <a 
                              className="block px-3 py-2 rounded-md text-base font-medium text-text-body hover:text-accent-primary hover:bg-white transition-colors duration-200"
                              onClick={closeMobileMenu}
                              >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                    {/* Consultation Button (Mobile) */}
                    <button 
                        onClick={() => { onOpenConsultation(); closeMobileMenu(); }}
                        className="w-full mt-2 btn-primary text-base py-2.5"
                     >
                        Contact Us
                    </button>
                 </div>
            </motion.div>
          )}
       </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 