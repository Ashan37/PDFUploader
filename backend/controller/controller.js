import pdfModel from '../models/pdfModel.js';

// Upload PDF
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
        data: file.buffer,
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

// Get all PDFs (for search)
export const getPdfs = async (req, res) => {
  try {
    const pdfs = await pdfModel.find({}, 'title description');
    res.json({ success: true, pdfs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Serve PDF by ID
export const getPdfById = async (req, res) => {
  try {
    const pdf = await pdfModel.findById(req.params.id);
    if (!pdf) return res.status(404).send('PDF not found');

    res.set({
      'Content-Type': pdf.pdf.mimetype,
      'Content-Disposition': `inline; filename="${pdf.pdf.filename}"`,
    });

    res.send(pdf.pdf.data);
  } catch (error) {
    res.status(500).send('Error retrieving PDF');
  }
};
