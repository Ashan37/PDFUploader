import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdf: {
    filename: String,
    path: { type: String, required: true },
    mimetype: String,
    size: Number,
  },
});

const pdfModel = mongoose.models.pdf || mongoose.model("pdf", pdfSchema);

export default pdfModel;
