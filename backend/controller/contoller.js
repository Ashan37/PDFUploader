// controller/contoller.js
import pdfModel from '../models/pdfModel.js';

export const addpdf = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.json({ success: false, message: 'Missing required fields' });
  }

  try {
    const newPdf = new pdfModel({
      title,
      description,
      pdf: {
        data: file.buffer, // save buffer directly
        mimetype: file.mimetype,
        filename: file.originalname,
      },
    });

    await newPdf.save();
    res.json({ success: true, message: 'PDF saved to database' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
