import emailjs from "@emailjs/browser";

// EmailJS Configuration
// Replace these with your actual values from EmailJS dashboard
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_m2hfg9b", // Replace with your service ID
  CONTACT_TEMPLATE_ID: "template_fs06e0j", // Replace with contact form template ID
  BOOKING_TEMPLATE_ID: "template_5k8cvho", // Replace with booking confirmation template ID
  PUBLIC_KEY: "jBzhwIYg0-UkSLiSp", // Replace with your public key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Send contact form inquiry to admin
 */
export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      trek: formData.trek || "Not specified",
      message: formData.message,
      to_email: "contact.trekoraadventures@gmail.com", // Your email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error };
  }
};

/**
 * Send booking confirmation email to user
 */
export const sendBookingConfirmation = async (bookingData) => {
  try {
    const templateParams = {
      user_name: bookingData.userName,
      user_email: bookingData.userEmail,
      trek_name: bookingData.trekName,
      trek_location: bookingData.trekLocation,
      trek_date: bookingData.trekDate,
      num_persons: bookingData.numPersons,
      total_amount: bookingData.totalAmount,
      whatsapp_link:
        bookingData.whatsappGroupLink ||
        "No WhatsApp group available for this trek",
      to_email: bookingData.userEmail, // Send to user's email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.BOOKING_TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("Failed to send booking confirmation:", error);
    return { success: false, error };
  }
};

export default { sendContactEmail, sendBookingConfirmation };
