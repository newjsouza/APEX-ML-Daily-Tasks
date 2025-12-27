const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const router = express.Router();

// Função para chamar a Perplexity API
defaultPrompt = 'Você é analista especializado em apostas esportivas com dados de XG (Expected Goals). Gere uma análise para os jogos do dia.';
async function callPerplexityAPI(prompt, apiKey) {
  const payload = {
    model: "pplx-7b-online",
    messages: [{ role: "user", content: prompt || defaultPrompt }]
  };
  console.log('Payload enviado para Perplexity:', JSON.stringify(payload));
  const response = await axios({
    method: 'post',
    url: process.env.PERPLEXITY_API_URL,
    data: payload,
    headers: {
      'Authorization': `Bearer ${apiKey || process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    transformRequest: [(data) => JSON.stringify(data)]
  });
  return response.data;
}

// Função para gerar análise diária e salvar
async function generateDailyAnalysis(date, leagues, apiKey) {
  const prompt = `Gere análise esportiva para as ligas: ${leagues} na data: ${date}. Responda em JSON.`;
  const perplexityResponse = await callPerplexityAPI(prompt, apiKey);
  const filePath = path.join(__dirname, '../data/analyses', `${date}.json`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(perplexityResponse, null, 2));
  return perplexityResponse;
}

// POST /api/generate-analysis?date=YYYY-MM-DD&leagues=BR,PL
router.post('/generate-analysis', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const leagues = req.query.leagues || process.env.ANALYSIS_LEAGUES;
  const apiKey = req.headers['x-api-key'] || null;
  try {
    const analysis = await generateDailyAnalysis(date, leagues, apiKey);
    res.json({ status: 'sucesso', data: date, analysis });
  } catch (err) {
    console.error('Erro ao gerar análise IA:', err);
    if (err.response) {
      // Loga resposta da Perplexity
      console.error('Resposta da Perplexity:', err.response.data);
      res.status(500).json({
        status: 'erro',
        message: err.message,
        details: err.response.data,
        raw: typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)
      });
    } else {
      console.error('Erro desconhecido:', err);
      res.status(500).json({ status: 'erro', message: err.message, raw: String(err) });
    }
  }
});

// GET /api/analyses?date=YYYY-MM-DD&days=7
router.get('/analyses', (req, res) => {
  const { date, days = 1 } = req.query;
  const dir = path.join(__dirname, '../data/analyses');
  let files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  if (date) files = files.filter(f => f.startsWith(date));
  files = files.slice(-days);
  const analyses = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f))));
  res.json({ status: 'sucesso', analyses });
});

// PUT /api/analyses/:date
router.put('/analyses/:date', (req, res) => {
  const { date } = req.params;
  const filePath = path.join(__dirname, '../data/analyses', `${date}.json`);
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.json({ status: 'sucesso', message: 'Análise atualizada.' });
});

// DELETE /api/analyses/:date
router.delete('/analyses/:date', (req, res) => {
  const { date } = req.params;
  const filePath = path.join(__dirname, '../data/analyses', `${date}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ status: 'sucesso', message: 'Análise deletada.' });
  } else {
    res.status(404).json({ status: 'erro', message: 'Arquivo não encontrado.' });
  }
});

// GET /api/test-perplexity
router.get('/test-perplexity', async (req, res) => {
  try {
    const result = await callPerplexityAPI('Responda apenas: ok.');
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: 'erro', message: err.message });
  }
});

module.exports = router;
