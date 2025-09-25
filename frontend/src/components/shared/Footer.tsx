import { MapPin, Phone, Mail } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  const resourcesLinks = [
    { title: "Blog", href: "#" },
    { title: "Help Center", href: "#" },
    { title: "API Documentation", href: "#" },
    { title: "Community", href: "#" },
  ];

  const companyLinks = [
    { title: "About Us", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="CurrencyCore Logo"
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-gray-400 mt-4">
              Your gateway to the future of finance. Trade cryptocurrencies with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-500 shrink-0" />
                <span>Global Hub, Internet</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-blue-500 shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-blue-500 shrink-0" />
                <span>support@currencycore.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>
            Copyright © {new Date().getFullYear()} CurrencyCore. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;