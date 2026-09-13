import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: String,
      required: true,
      index: true
    },

    note_text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
);

const Note = mongoose.model(
  "Note",
  noteSchema
);

export default Note;