import React from "react";
import { Mountain, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/trekora1.png";
import RevealAnimation from "./RevealAnimation";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <RevealAnimation animationType="fadeInUp" delay={100}>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <img src={logo} alt="TREKORA" className="h-10 w-auto" />
                </div>
                <span className="text-2xl font-bold">TREKORA</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Your gateway to unforgettable trekking adventures across
                Maharashtra. Explore nature, challenge yourself, and create
                lasting memories.
              </p>
            </div>
          </RevealAnimation>

          {/* Quick Navigation */}
          <RevealAnimation animationType="fadeInUp" delay={200}>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-500">
                Explore
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/destinations")}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    Destinations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/gallery")}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </RevealAnimation>

          {/* Contact Section */}
          <RevealAnimation animationType="fadeInUp" delay={300}>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-500">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+919156797374"
                  className="flex items-center space-x-3 text-gray-400 hover:text-orange-500 transition-colors group"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 group-hover:text-orange-500" />
                  <span className="text-sm">+91 91567 97374</span>
                </a>

                <a
                  href="mailto:contact.trekoraadventures@gmail.com"
                  className="flex items-start space-x-3 text-gray-400 hover:text-orange-500 transition-colors group"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:text-orange-500" />
                  <span className="text-sm break-all">
                    contact.trekoraadventures@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/trekora.adventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-orange-500 transition-colors group"
                >
                  <Instagram className="h-5 w-5 flex-shrink-0 group-hover:text-orange-500" />
                  <span className="text-sm">@trekora.adventures</span>
                </a>

                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-orange-500" />
                  <span className="text-sm">Maharashtra, India</span>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TREKORA. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate("/privacy")}
                className="text-gray-500 hover:text-orange-500 transition-colors text-sm"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="text-gray-500 hover:text-orange-500 transition-colors text-sm"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
