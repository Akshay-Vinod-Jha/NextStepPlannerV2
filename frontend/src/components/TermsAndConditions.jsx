import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: October 2025</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Trekora's services, you accept and agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Booking and Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All bookings must be made through our official website or authorized channels.</li>
                <li>Payment must be completed as per the instructions provided during booking.</li>
                <li>Payment screenshots must be uploaded for verification.</li>
                <li>Bookings are confirmed only after payment verification by our team.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>15+ days before trek:</strong> 80% refund</li>
                <li><strong>7-14 days before trek:</strong> 50% refund</li>
                <li><strong>Less than 7 days:</strong> No refund</li>
                <li>Cancellations due to weather or safety concerns will be rescheduled without penalty.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Participant Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Participants must be physically fit for the selected trek.</li>
                <li>Any medical conditions must be disclosed before booking.</li>
                <li>Participants must follow safety instructions from trek leaders.</li>
                <li>Personal belongings are the participant's responsibility.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Liability</h2>
              <p className="leading-relaxed">
                Trekora takes utmost care for participant safety. However, trekking involves inherent risks. 
                Participants undertake treks at their own risk. Trekora is not liable for injuries, losses, or 
                damages occurring during the trek, except in cases of proven negligence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Changes to Itinerary</h2>
              <p className="leading-relaxed">
                Trekora reserves the right to modify trek itineraries due to weather, safety concerns, or 
                unforeseen circumstances. Participants will be notified of any changes as soon as possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
              <p className="leading-relaxed">
                For any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
