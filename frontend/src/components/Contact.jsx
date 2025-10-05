import React, { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    trek: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your <span className="text-orange-600">Adventure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to embark on your Himalayan journey? Get in touch with our
            trekking experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@trekora.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Office</h4>
                  <p className="text-gray-600">Rishikesh, Uttarakhand, India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-2">Why Choose Trekora?</h4>
              <ul className="space-y-2 text-sm">
                <li>• 15+ years of trekking experience</li>
                <li>• Certified mountain guides</li>
                <li>• Small group sizes (max 12 people)</li>
                <li>• 24/7 emergency support</li>
                <li>• Eco-friendly practices</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="Enter your phone"
                  />
                </div>

                <div>
                  <label
                    htmlFor="trek"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Interested Trek
                  </label>
                  <select
                    id="trek"
                    name="trek"
                    value={formData.trek}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a trek</option>
                    <option value="roopkund">Roopkund Trek</option>
                    <option value="valley-of-flowers">Valley of Flowers</option>
                    <option value="chadar">Chadar Trek</option>
                    <option value="hampta-pass">Hampta Pass</option>
                    <option value="kedarkantha">Kedarkantha Trek</option>
                    <option value="custom">Custom Trek</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your trekking goals, fitness level, and any special requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300"
              >
                <span>Send Message</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;