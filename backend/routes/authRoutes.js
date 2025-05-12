import express from 'express';
import multer from 'multer';
import { addpdf, getPdfs, getPdfById } from '../controller/controller.js';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addpdf', upload.single('file'), addpdf);
router.get('/getpdfs', getPdfs);
router.get('/getpdf/:id', getPdfById);

export default router;
