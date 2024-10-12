import express from 'express';
import multer from 'multer';
import path from 'path';

// Setup storage for uploaded models
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Models_upload')); // Save in Models_upload folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep original file name
    }
});

const upload = multer({ storage });

const router = express.Router();

// Route for uploading models
router.post('/model', upload.fields([{ name: 'model' }, { name: 'poster' }]), (req, res) => {
    const model = req.files['model'] ? req.files['model'][0] : null;
    const poster = req.files['poster'] ? req.files['poster'][0] : null;

    if (!model || !poster) {
        return res.status(400).json({ message: 'Model or poster not uploaded' });
    }

    const modelUrl = `/Models_upload/${model.filename}`;
    const posterUrl = `/Models_upload/${poster.filename}`;

    res.json({ modelUrl, posterUrl });
});

export default router;
