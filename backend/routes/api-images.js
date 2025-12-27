const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const UPLOADS_PATH = process.env.UPLOADS_PATH || path.join(__dirname, '../uploads');
const MAX_IMAGE_SIZE = parseInt(process.env.MAX_IMAGE_SIZE) || 5242880;

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = req.body.date || new Date().toISOString().split('T')[0];
    const dir = path.join(UPLOADS_PATH, date);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas arquivos de imagem são permitidos!'));
    }
    cb(null, true);
  }
});

// POST /api/upload-image
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado.' });
  const date = req.body.date || new Date().toISOString().split('T')[0];
  const url = `/uploads/${date}/${req.file.filename}`;
  // Aqui você pode atualizar o JSON de análise se desejar
  res.json({ url, filename: req.file.filename, date });
});

// GET /api/images/:date
router.get('/images/:date', (req, res) => {
  const date = req.params.date;
  const dir = path.join(UPLOADS_PATH, date);
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png|gif)$/i));
  const urls = files.map(f => `/uploads/${date}/${f}`);
  res.json(urls);
});

// GET /api/images/:date/:filename
router.get('/images/:date/:filename', (req, res) => {
  const { date, filename } = req.params;
  const filePath = path.join(UPLOADS_PATH, date, filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('Arquivo não encontrado');
  res.sendFile(filePath);
});

// DELETE /api/images/:filename (opcional)
router.delete('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  // Busca em todas as datas
  const dates = fs.readdirSync(UPLOADS_PATH).filter(d => fs.statSync(path.join(UPLOADS_PATH, d)).isDirectory());
  let deleted = false;
  for (const date of dates) {
    const filePath = path.join(UPLOADS_PATH, date, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deleted = true;
      break;
    }
  }
  if (deleted) return res.json({ status: 'deletado', filename });
  res.status(404).json({ error: 'Arquivo não encontrado' });
});

module.exports = router;
