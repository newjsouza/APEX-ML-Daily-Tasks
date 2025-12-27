const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = process.env.DATA_PATH || path.join(__dirname, '../data');
const analysesDir = path.join(DATA_PATH, 'analyses');

// Helper para validar estrutura básica de análise
function validateAnalysis(data) {
  return data && data.competicoes && data.jogos;
}

// GET /api/analyses - Lista todas as análises, filtra por data (opcional)
router.get('/analyses', (req, res) => {
  const { date } = req.query;
  if (!fs.existsSync(analysesDir)) return res.json([]);
  const files = fs.readdirSync(analysesDir).filter(f => f.endsWith('.json'));
  let result = files;
  if (date) result = result.filter(f => f.includes(date));
  result = result.map(f => {
    const content = fs.readFileSync(path.join(analysesDir, f), 'utf8');
    return JSON.parse(content);
  });
  res.json(result);
});

// GET /api/analyses/:date - Análise específica de um dia
router.get('/analyses/:date', (req, res) => {
  const { date } = req.params;
  const file = path.join(analysesDir, `${date}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Análise não encontrada' });
  const content = fs.readFileSync(file, 'utf8');
  res.json(JSON.parse(content));
});

// POST /api/analyses - Cria análise nova
router.post('/analyses', (req, res) => {
  const data = req.body;
  if (!validateAnalysis(data)) return res.status(400).json({ error: 'Estrutura de análise inválida' });
  const date = data.data || new Date().toISOString().split('T')[0];
  if (!fs.existsSync(analysesDir)) fs.mkdirSync(analysesDir, { recursive: true });
  const file = path.join(analysesDir, `${date}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.status(201).json({ status: 'criado', file });
});

// PUT /api/analyses/:date - Atualiza análise existente
router.put('/analyses/:date', (req, res) => {
  const { date } = req.params;
  const data = req.body;
  if (!validateAnalysis(data)) return res.status(400).json({ error: 'Estrutura de análise inválida' });
  if (!fs.existsSync(analysesDir)) fs.mkdirSync(analysesDir, { recursive: true });
  const file = path.join(analysesDir, `${date}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ status: 'atualizado', file });
});

module.exports = router;
