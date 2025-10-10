import emailjs from "@emailjs/browser";

// EmailJS Configuration
// Replace these with your actual values from EmailJS dashboard
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_m2hfg9b", // Replace with your service ID
  CONTACT_TEMPLATE_ID: "template_fs06e0j", // Replace with contact form template ID
  BOOKING_TEMPLATE_ID: "template_5k8cvho", // Replace with booking confirmation template ID
  BOOKING_CONFIRMED_TEMPLATE_ID: "template_5k8cvho", // Using existing template for admin confirmation
  BOOKING_CANCELLED_TEMPLATE_ID: "template_5k8cvho", // Using existing template for admin cancellation
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

/**
 * Send booking confirmation email when admin confirms booking
 */
export const sendBookingConfirmedEmail = async (bookingData) => {
  try {
    const templateParams = {
      user_name: bookingData.userName,
      user_email: bookingData.userEmail,
      trek_name: bookingData.trekName,
      trek_location: bookingData.trekLocation,
      trek_date: `${bookingData.trekDateStart} to ${bookingData.trekDateEnd}`,
      num_persons: bookingData.numPersons,
      total_amount: bookingData.totalAmount,
      whatsapp_link:
        bookingData.whatsappGroupLink || "Will be shared soon via WhatsApp",
      // Adding status-specific message for confirmation
      message: `🎉 GREAT NEWS! Your booking has been CONFIRMED by our team! 
      
Booking ID: ${bookingData.bookingId}
Status: ✅ CONFIRMED

Your payment has been verified and your trek booking is now confirmed. You will receive WhatsApp group details soon. Please keep this booking ID for reference.

Contact us: 9156797374
Thank you for choosing TREKORA Adventures!`,
      to_email: bookingData.userEmail,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.BOOKING_CONFIRMED_TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    return { success: false, error };
  }
};

/**
 * Send booking cancellation email when admin cancels booking
 */
export const sendBookingCancelledEmail = async (bookingData) => {
  try {
    const templateParams = {
      user_name: bookingData.userName,
      user_email: bookingData.userEmail,
      trek_name: bookingData.trekName,
      trek_location: bookingData.trekLocation,
      trek_date: `${bookingData.trekDateStart} to ${bookingData.trekDateEnd}`,
      num_persons: bookingData.numPersons || 1,
      total_amount: bookingData.totalAmount,
      whatsapp_link: "N/A (Booking Cancelled)",
      // Adding status-specific message for cancellation
      message: `❌ We regret to inform you that your booking has been CANCELLED.
      
Booking ID: ${bookingData.bookingId}
Status: ❌ CANCELLED
Reason: ${bookingData.cancellationReason || "Administrative decision"}

Your full refund of ${
        bookingData.totalAmount
      } will be processed within 5-7 business days. We sincerely apologize for any inconvenience caused.

For immediate assistance, contact us: 9156797374
TREKORA Adventures Team`,
      to_email: bookingData.userEmail,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.BOOKING_CANCELLED_TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("Failed to send booking cancellation email:", error);
    return { success: false, error };
  }
};

export default {
  sendContactEmail,
  sendBookingConfirmation,
  sendBookingConfirmedEmail,
  sendBookingCancelledEmail,
};
