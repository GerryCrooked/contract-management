const express = require('express');
const multer = require('multer');
const { uploadFile, downloadFile, deleteFile } = require('../services/minioService');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// 🚀 Upload a contract document
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded." });
        
        await uploadFile(req.file.originalname, req.file.buffer, req.file.mimetype);
        res.json({ message: "File uploaded successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🚀 Download a contract document
router.get('/download/:filename', async (req, res) => {
    try {
        const stream = await downloadFile(req.params.filename);
        stream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🚀 Delete a contract document
router.delete('/delete/:filename', async (req, res) => {
    try {
        await deleteFile(req.params.filename);
        res.json({ message: "File deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
