// routes/authRoutes.js
import express from 'express';
import multer from 'multer';
import { addpdf,getPdfs } from '../controller/contoller.js';


const router = express.Router();

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addpdf', upload.single('file'), addpdf);
router.get('/getpdfs',getPdfs);

export default router;
