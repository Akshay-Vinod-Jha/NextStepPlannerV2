import React from 'react';
import { Mountain, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold">Trekora</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the magic of India's Himalayas with expert-guided trekking adventures. 
              Creating unforgettable memories since 2008.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-orange-600 transition-colors">Home</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-orange-600 transition-colors">Destinations</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-orange-600 transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-orange-600 transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-orange-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Treks</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Roopkund Trek</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Valley of Flowers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Chadar Trek</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Kedarkantha</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Hampta Pass</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Trekora. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors text-sm">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;