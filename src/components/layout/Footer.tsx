import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp
} from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' }
    ],
    legal: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Grievance', href: '/grievance' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Advertise with Us', href: '/advertise' },
      { label: 'Become a Journalist', href: '/become-journalist' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'text-[#1877f2]' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'text-[#1da1f2]' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'text-[#e4405f]' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'text-[#ff0000]' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'text-[#0077b5]' },
    { icon: FaTelegram, href: '#', label: 'Telegram', color: 'text-[#0088cc]' },
    { icon: FaWhatsapp, href: '#', label: 'WhatsApp', color: 'text-[#25d366]' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand, Description and Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Glocal News</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted source for hyperlocal to global news coverage. We deliver authentic, verified news in your preferred language across India.
            </p>
            {/* Social Icons */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} hover:opacity-80 transition-opacity`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Glocal News. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}