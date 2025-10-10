import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Instagram,
  Loader2,
  CheckCircle,
  Phone,
} from "lucide-react";
import { sendContactEmail } from "../utils/emailService";
import { toast } from "react-toastify";
import RevealAnimation from "./RevealAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    trek: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitSuccess(true);
        toast.success("Message sent successfully! We'll get back to you soon.");

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            trek: "",
            message: "",
          });
          setSubmitSuccess(false);
        }, 3000);
      } else {
        toast.error(
          "Failed to send message. Please try again or email us directly."
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <RevealAnimation animationType="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plan Your <span className="text-orange-600">Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to explore Maharashtra's beautiful treks? Get in touch with
              us
            </p>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RevealAnimation animationType="fadeInLeft" delay={200}>
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
                    <a
                      href="tel:+919156797374"
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      +91 91567 97374
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a
                      href="mailto:contact.trekoraadventures@gmail.com"
                      className="text-gray-600 hover:text-orange-600 transition-colors break-all"
                    >
                      contact.trekoraadventures@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-full">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram</h4>
                    <a
                      href="https://www.instagram.com/trekora.adventures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      @trekora.adventures
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white">
                <h4 className="text-xl font-bold mb-2">Why Choose TREKORA?</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Explore Maharashtra's scenic treks</li>
                  <li>• Expert local guides</li>
                  <li>• Safe and organized trips</li>
                  <li>• Affordable packages</li>
                  <li>• Memorable adventures</li>
                </ul>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation animationType="fadeInRight" delay={400}>
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
                      <option value="general">General Inquiry</option>
                      <option value="custom">Custom Trek Request</option>
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
                  disabled={isSubmitting || submitSuccess}
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                    submitSuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : isSubmitting
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;
