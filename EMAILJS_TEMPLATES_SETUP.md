# EmailJS Templates Setup Guide for TREKORA

## Templates Required

You need to create 2 new templates in your EmailJS dashboard:

### 1. Booking Confirmation Template

**Template ID:** `template_booking_confirmed`

**Subject:** 🎉 Your TREKORA Booking is CONFIRMED! - {{booking_id}}

**HTML Body:**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .header {
        background: linear-gradient(135deg, #ea580c, #dc2626);
        color: white;
        padding: 30px;
        text-align: center;
      }
      .content {
        padding: 30px;
        background-color: #f9f9f9;
      }
      .booking-details {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .whatsapp-section {
        background: #25d366;
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
      }
      .footer {
        background: #333;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background: #25d366;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>🎉 BOOKING CONFIRMED!</h1>
        <h2>{{company_name}} Adventures</h2>
      </div>

      <div class="content">
        <h3>Dear {{user_name}},</h3>
        <p>
          Great news! Your trek booking has been <strong>CONFIRMED</strong> by
          our team after payment verification.
        </p>

        <div class="booking-details">
          <h4>📋 Booking Details</h4>
          <div class="detail-row">
            <span><strong>Booking ID:</strong></span>
            <span>{{booking_id}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Trek Name:</strong></span>
            <span>{{trek_name}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Location:</strong></span>
            <span>{{trek_location}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Trek Dates:</strong></span>
            <span>{{trek_date_start}} to {{trek_date_end}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Number of Persons:</strong></span>
            <span>{{num_persons}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Total Amount Paid:</strong></span>
            <span>{{total_amount}}</span>
          </div>
        </div>

        <div class="whatsapp-section">
          <h4>📱 Join Your Trek WhatsApp Group</h4>
          <p>{{whatsapp_link}}</p>
          <a href="{{whatsapp_link}}" class="btn">Join WhatsApp Group</a>
        </div>

        <h4>📝 What's Next?</h4>
        <ul>
          <li>Save this confirmation email for your records</li>
          <li>Join the WhatsApp group for trek updates</li>
          <li>Pack according to the trek guidelines</li>
          <li>Reach the pickup point on time</li>
        </ul>

        <h4>📞 Need Help?</h4>
        <p>Contact us at: <strong>{{contact_number}}</strong></p>
        <p>Email: contact.trekoraadventures@gmail.com</p>
      </div>

      <div class="footer">
        <p>
          &copy; 2025 {{company_name}} Adventures | Making Memories, One Trek at
          a Time
        </p>
      </div>
    </div>
  </body>
</html>
```

### 2. Booking Cancellation Template

**Template ID:** `template_booking_cancelled`

**Subject:** ❌ Your TREKORA Booking has been Cancelled - {{booking_id}}

**HTML Body:**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .header {
        background: linear-gradient(135deg, #dc2626, #991b1b);
        color: white;
        padding: 30px;
        text-align: center;
      }
      .content {
        padding: 30px;
        background-color: #f9f9f9;
      }
      .booking-details {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .refund-section {
        background: #fef3c7;
        color: #92400e;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .footer {
        background: #333;
        color: white;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>❌ BOOKING CANCELLED</h1>
        <h2>{{company_name}} Adventures</h2>
      </div>

      <div class="content">
        <h3>Dear {{user_name}},</h3>
        <p>
          We regret to inform you that your trek booking has been
          <strong>CANCELLED</strong> by our team.
        </p>

        <div class="booking-details">
          <h4>📋 Cancelled Booking Details</h4>
          <div class="detail-row">
            <span><strong>Booking ID:</strong></span>
            <span>{{booking_id}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Trek Name:</strong></span>
            <span>{{trek_name}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Location:</strong></span>
            <span>{{trek_location}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Trek Dates:</strong></span>
            <span>{{trek_date_start}} to {{trek_date_end}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Amount Paid:</strong></span>
            <span>{{total_amount}}</span>
          </div>
          <div class="detail-row">
            <span><strong>Cancellation Reason:</strong></span>
            <span>{{cancellation_reason}}</span>
          </div>
        </div>

        <div class="refund-section">
          <h4>💰 Refund Information</h4>
          <p>
            Your full refund of <strong>{{total_amount}}</strong> will be
            processed within 5-7 business days to your original payment method.
          </p>
        </div>

        <h4>📝 What's Next?</h4>
        <ul>
          <li>Wait for refund confirmation (5-7 business days)</li>
          <li>Check our website for alternative trek dates</li>
          <li>Contact us if you need immediate assistance</li>
        </ul>

        <h4>📞 Need Help?</h4>
        <p>
          We sincerely apologize for any inconvenience caused. Please contact
          us:
        </p>
        <p>Phone: <strong>{{contact_number}}</strong></p>
        <p>Email: contact.trekoraadventures@gmail.com</p>
      </div>

      <div class="footer">
        <p>
          &copy; 2025 {{company_name}} Adventures | We're Sorry for the
          Inconvenience
        </p>
      </div>
    </div>
  </body>
</html>
```

## Setup Instructions

1. **Login to EmailJS Dashboard:** https://dashboard.emailjs.com/
2. **Go to Email Templates**
3. **Create New Template** (repeat for both templates)
4. **Copy the HTML content** from above
5. **Set the Template IDs** exactly as specified:
   - `template_booking_confirmed` for confirmation
   - `template_booking_cancelled` for cancellation
6. **Test the templates** with sample data

## Template Variables Used

Both templates use these variables that will be automatically populated:

- `{{user_name}}` - Customer's name
- `{{user_email}}` - Customer's email
- `{{trek_name}}` - Name of the trek
- `{{trek_location}}` - Trek location
- `{{trek_date_start}}` - Trek start date
- `{{trek_date_end}}` - Trek end date
- `{{num_persons}}` - Number of people
- `{{total_amount}}` - Amount paid
- `{{booking_id}}` - Booking reference ID
- `{{whatsapp_link}}` - WhatsApp group link
- `{{contact_number}}` - TREKORA contact number
- `{{company_name}}` - TREKORA
- `{{cancellation_reason}}` - Reason for cancellation

## Testing

After setting up templates:

1. Create a test booking
2. Go to Admin Panel
3. Confirm/Cancel the booking
4. Check if emails are received
5. Verify all details are correctly populated

---

**Important:** Make sure the template IDs in EmailJS dashboard exactly match the ones in the code!
