// backend/routes/api-gemini.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Função para chamar Gemini (Google)
async function callGeminiAPI(prompt, apiKey) {
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + (apiKey || process.env.GEMINI_API_KEY),
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
  return response.data;
}

// POST /api/generate-analysis-gemini?date=YYYY-MM-DD&leagues=BR,PL
router.post('/generate-analysis-gemini', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const leagues = req.query.leagues || 'BR,CL,PL,LA';
  const apiKey = req.headers['x-api-key'] || null;
  const prompt = `Gere análise esportiva para as ligas: ${leagues} na data: ${date}. Responda em JSON.`;
  try {
    const geminiResponse = await callGeminiAPI(prompt, apiKey);
    res.json({ status: 'sucesso', data: date, analysis: geminiResponse });
  } catch (err) {
    console.error('Erro Gemini:', err);
    if (err.response) {
      res.status(500).json({ status: 'erro', message: err.message, details: err.response.data });
    } else {
      res.status(500).json({ status: 'erro', message: err.message });
    }
  }
});

module.exports = router;
