// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
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
    enum: ['confirmed', 'cancelled', 'pending', 'booked','upcoming'],
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
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
