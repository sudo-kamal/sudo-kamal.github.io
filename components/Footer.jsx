import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" />, href: '#' }, // Replace # with actual links
    { name: 'Twitter', icon: <FaTwitter className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <FaInstagram className="w-5 h-5" />, href: '#' },
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, href: '#' },
  ];

  return (
    <footer className="bg-secondary-bg text-text-muted pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-accent-secondary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Company Info */}
        <div className="md:col-span-1">
          <Link href="#home" legacyBehavior>
            <a className="inline-block mb-3 focus:outline-none" aria-label="Devasoft Home">
               {/* Logo image - check if it looks okay on light bg */}
              <Image 
                src="/images/devasoft-logo.png" 
                alt="Devasoft Logo"
                width={150}
                height={40}
                className="h-auto transition-opacity duration-200"
                priority
              />
            </a>
          </Link>
           {/* Use body text color */}
          <p className="text-sm leading-relaxed text-text-body">
            Building scalable and future-ready software solutions for businesses across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
           {/* Use heading text color */}
          <h3 className="text-lg font-semibold text-text-heading mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} legacyBehavior>
                   {/* Use body text color, accent on hover */}
                  <a className="text-text-body hover:text-accent-primary hover:underline transition duration-200">
                    {link.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          {/* Use heading text color */}
          <h3 className="text-lg font-semibold text-text-heading mb-4">Connect With Us</h3>
          <div className="flex space-x-5 mb-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                // Use muted text color, accent on hover
                className="text-text-muted hover:text-accent-primary transition duration-200"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="text-sm text-text-body">
            <p>Email: <a href="mailto:info@devasoft.in" className="hover:text-accent-primary hover:underline">info@devasoft.in</a></p>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Update border/text color */}
      <div className="border-t border-accent-secondary pt-6 text-center text-sm text-text-muted">
        <p>&copy; {currentYear} Devasoft. All rights reserved.</p>
        {/* Optional Links */}
        {/* <p className="mt-1">
          <Link href="/privacy"><a className="hover:text-accent-primary hover:underline">Privacy Policy</a></Link> |
          <Link href="/terms"><a className="hover:text-accent-primary hover:underline ml-1">Terms of Service</a></Link>
        </p> */}
      </div>
    </footer>
  );
};

export default Footer; 