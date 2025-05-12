import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdf: {
    data: Buffer,
    mimetype: String,
    filename: String,
  },
});

const pdfModel=mongoose.models.pdf||mongoose.model('pdf',pdfSchema);

export default pdfModel;
