import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleBack}
          className="flex items-center text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: October 2025</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="leading-relaxed mb-3">
                We collect information that you provide directly to us when using our services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, contact number</li>
                <li><strong>Booking Information:</strong> Trek selections, dates, number of participants</li>
                <li><strong>Payment Information:</strong> Payment screenshots (processed securely)</li>
                <li><strong>Communication Data:</strong> Messages sent through contact forms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and confirm your trek bookings</li>
                <li>Send booking confirmations and important updates via email</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage and Security</h2>
              <p className="leading-relaxed mb-3">
                We take reasonable measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data is stored securely in our database</li>
                <li>Payment screenshots are stored using Cloudinary's secure cloud storage</li>
                <li>We use industry-standard encryption for data transmission</li>
                <li>Access to personal data is restricted to authorized personnel only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
              <p className="leading-relaxed mb-3">
                We use trusted third-party services to operate our platform:
              </p>
              
              <p className="leading-relaxed mt-3">
                These services have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to maintain your session, remember your preferences, 
                and improve your browsing experience. You can disable cookies in your browser settings, 
                but some features may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
              <p className="leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page with an updated "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                <br />
                <a href="mailto:contact.trekoraadventures@gmail.com" className="text-orange-600 hover:text-orange-700">
                  contact.trekoraadventures@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
