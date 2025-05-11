import express from 'express';
import multer from 'multer';
import { addpdf } from '../controller/contoller.js';

const authRouter = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// Route with file upload middleware
authRouter.post('/addpdf', upload.single('file'), addpdf);

export default authRouter;
