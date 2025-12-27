require('dotenv').config();
const axios = require('axios');

async function testPerplexity() {
  try {
    const response = await axios.post(
      process.env.PERPLEXITY_API_URL,
      {
        model: "llama-2-70b-chat",
        messages: [{ role: "user", content: "Olá, Perplexity! Responda apenas: ok." }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Resposta:', response.data);
  } catch (err) {
    console.error('Erro ao conectar com Perplexity:', err.response ? err.response.data : err.message);
  }
}

testPerplexity();
