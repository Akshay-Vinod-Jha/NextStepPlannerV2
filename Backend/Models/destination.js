import mongoose from "mongoose";
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    dates: [
      {
        startDate: Date,
        endDate: Date,
      },
    ],
    transportMode: String,
    duration: String,
    rating: Number,
    price: Number,
    description: String,
    whatsappGroupLink: {
      type: String,
      validate: {
        validator: function (v) {
          // If provided, it should be a valid URL
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "WhatsApp group link must be a valid URL",
      },
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
