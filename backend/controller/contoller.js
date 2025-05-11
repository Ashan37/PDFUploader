import pdfModel from '../models/pdfModel.js';

export const addpdf = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.json({ success: false, message: 'Missing required fields' });
  }

  try {
    const job = new pdfModel({
      title,
      description,
      pdf: {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    await job.save();
    return res.json({
      success: true,
      message: 'PDF uploaded and saved successfully!',
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
