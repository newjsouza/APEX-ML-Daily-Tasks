/**
 * Confidence Calculator - Cálculo avançado de confiança
 */

/**
 * Calcula confiança baseada em múltiplos fatores
 * @param {Object} params - Parâmetros de cálculo
 * @returns {number} Confiança entre 0 e 1
 */
function calculateConfidence(params) {
  const {
    league,
    xgDiff,
    formDiff,
    h2hAdvantage,
    oddsImplied,
    baseRate
  } = params;

  // Pesos de cada fator
  const weights = {
    xg: 0.30,
    form: 0.25,
    h2h: 0.15,
    odds: 0.20,
    base: 0.10
  };

  // Normalizar xG difference (0 a 1)
  const xgScore = Math.min(Math.abs(xgDiff) / 2.0, 1.0);

  // Normalizar form difference (-15 a +15 pontos -> 0 a 1)
  const formScore = Math.min((formDiff + 15) / 30, 1.0);

  // H2H advantage já normalizado (-1 a 1 -> 0 a 1)
  const h2hScore = (h2hAdvantage + 1) / 2;

  // Odds implied probability como confiança
  const oddsScore = Math.max(oddsImplied.home, oddsImplied.away);

  // Combinar com pesos
  const confidence = (
    (xgScore * weights.xg) +
    (formScore * weights.form) +
    (h2hScore * weights.h2h) +
    (oddsScore * weights.odds) +
    (baseRate * weights.base)
  );

  // Ajuste por liga (AFCON tem maior confiança histórica)
  let leagueMultiplier = 1.0;
  if (league === 'AFCON') leagueMultiplier = 1.15;
  if (league === 'PL') leagueMultiplier = 0.95;

  return Math.min(confidence * leagueMultiplier, 1.0);
}

/**
 * Calcula Expected Value (EV)
 * @param {Object} params - Parâmetros de cálculo
 * @returns {number} EV em percentual
 */
function calculateEV(params) {
  const { confidence, odds, stake } = params;

  // EV = (Probabilidade * Odd * Stake) - Stake
  const expectedReturn = confidence * odds * stake;
  const ev = ((expectedReturn - stake) / stake);

  return ev;
}

/**
 * Calcula stake recomendado baseado em Kelly Criterion
 * @param {number} confidence - Confiança (0-1)
 * @param {number} odds - Odd da aposta
 * @param {number} bankroll - Banca disponível
 * @returns {number} Stake recomendado
 */
function calculateKellyStake(confidence, odds, bankroll) {
  // Kelly = (bp - q) / b
  // b = odds - 1
  // p = confidence
  // q = 1 - confidence

  const b = odds - 1;
  const p = confidence;
  const q = 1 - confidence;

  const kelly = (b * p - q) / b;

  // Kelly fracionário (1/4 Kelly para segurança)
  const fractionalKelly = kelly * 0.25;

  // Stake máximo de 5% da banca
  return Math.min(fractionalKelly * bankroll, bankroll * 0.05);
}

/**
 * Calcula intervalo de confiança estatístico
 * @param {number} confidence - Confiança central
 * @param {number} sampleSize - Tamanho da amostra histórica
 * @returns {Object} Intervalo de confiança
 */
function calculateConfidenceInterval(confidence, sampleSize = 100) {
  // Fórmula de margem de erro para proporção
  const z = 1.96; // 95% confidence
  const marginOfError = z * Math.sqrt((confidence * (1 - confidence)) / sampleSize);

  return {
    lower: Math.max(0, confidence - marginOfError),
    upper: Math.min(1, confidence + marginOfError),
    margin: marginOfError
  };
}

module.exports = {
  calculateConfidence,
  calculateEV,
  calculateKellyStake,
  calculateConfidenceInterval
};