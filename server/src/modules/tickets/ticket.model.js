import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },

    customer_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    customer_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 10000
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Closed"
      ],
      default: "Open",
      index: true
    }
  },
  {
    timestamps: true
  }
);

const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);

export default Ticket;