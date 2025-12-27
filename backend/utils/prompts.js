// backend/utils/prompts.js

function buildAnalysisPrompt(leagues, date) {
  return `Você é analista especializado em apostas esportivas com dados de XG (Expected Goals).\n\nData: ${date}\nLigas: ${leagues}\n\nAnalise os seguintes jogos com XG acumulado e histórico recente.\n\nPOR FAVOR, RETORNE EM JSON:\n{\n  "jogos": [ ... ],\n  "multiplas": [ ... ],\n  "bingos": [ ... ],\n  "noticias": [ ... ]\n}`;
}

function buildOddsPrompt(matchData) {
  return `Sugira odds e apostas para o seguinte jogo:\n${JSON.stringify(matchData, null, 2)}\n\nRetorne em JSON com tipo, odd e confiança.`;
}

function buildNewsPrompt(teams) {
  return `Busque notícias relevantes para os times: ${teams.join(', ')}.\nRetorne uma lista de manchetes e resumos em JSON.`;
}

function parsePerplexityResponse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    // Tenta extrair JSON de resposta textual
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {
        return { erro: 'Falha ao parsear JSON', texto: text };
      }
    }
    return { erro: 'Resposta não contém JSON', texto: text };
  }
}

module.exports = {
  buildAnalysisPrompt,
  buildOddsPrompt,
  buildNewsPrompt,
  parsePerplexityResponse
};
