// models/pdfModel.js
import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdf: {
    data: Buffer, // binary data
    mimetype: String,
    filename: String,
  },
});

export default mongoose.models.pdf || mongoose.model('pdf', pdfSchema);
