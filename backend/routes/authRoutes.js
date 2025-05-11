// routes/authRoutes.js
import express from 'express';
import multer from 'multer';
import { addpdf } from '../controller/contoller.js';

const router = express.Router();

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addpdf', upload.single('file'), addpdf);

export default router;
