// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  bookingId: {
    type: String,
    required: false,
    unique: true,
    sparse: true  // Allows multiple null values
  },
  dateSlot: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  numPersons: {
    type: Number,
    default: 1
  },
  bookingStatus: {
    type: String,
    enum: [ 'pending','confirmed', 'cancelled',],
    default : 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  orderId: {
    type: String
  },
  paymentId: {
    type: String
  },
  amountPaid: {
    type: Number
  },
  mobileNumber : {
    type : Number,
    required : true,
  },
  paymentScreenshot: {
    url: String,
    filename: String
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
