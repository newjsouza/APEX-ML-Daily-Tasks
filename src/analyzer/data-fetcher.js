/**
 * Data Fetcher - Busca dados de múltiplas fontes
 */

const axios = require('axios');
require('dotenv').config();

class DataFetcher {
  constructor() {
    this.sources = {
      perplexity: process.env.PERPLEXITY_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      sofascore: process.env.SOFASCORE_API_KEY
    };
  }

  /**
   * Busca dados completos de uma partida
   */
  async fetchMatchData(matchId, league) {
    try {
      const [basicData, xgData, formData, h2hData] = await Promise.all([
        this.fetchBasicMatchInfo(matchId),
        this.fetchXGData(matchId),
        this.fetchFormData(matchId),
        this.fetchH2HData(matchId)
      ]);

      return {
        ...basicData,
        ...xgData,
        ...formData,
        ...h2hData,
        league,
        validated: true,
        dataQuality: this.assessDataQuality(basicData, xgData, formData)
      };
    } catch (error) {
      console.error(`Erro ao buscar dados da partida ${matchId}:`, error.message);
      return null;
    }
  }

  /**
   * Busca informações básicas da partida
   */
  async fetchBasicMatchInfo(matchId) {
    // Implementar integração com API real
    return {
      matchId,
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      homeOdds: 2.10,
      awayOdds: 3.50,
      drawOdds: 3.20,
      date: new Date().toISOString()
    };
  }

  /**
   * Busca dados de Expected Goals (xG)
   */
  async fetchXGData(matchId) {
    // Integração com Understat ou similar
    return {
      homeXG: 1.8,
      awayXG: 1.2,
      homeXGAgainst: 0.9,
      awayXGAgainst: 1.5
    };
  }

  /**
   * Busca dados de forma das equipes
   */
  async fetchFormData(matchId) {
    return {
      homeForm: 'WWDWL',  // Últimos 5 jogos
      awayForm: 'WDWWW',
      homeStats: {
        winRate: 0.65,
        avgGoalsScored: 2.1,
        avgGoalsConceded: 1.2
      },
      awayStats: {
        winRate: 0.55,
        avgGoalsScored: 1.8,
        avgGoalsConceded: 1.4
      }
    };
  }

  /**
   * Busca histórico de confrontos diretos
   */
  async fetchH2HData(matchId) {
    return {
      h2h: {
        total: 10,
        homeWins: 4,
        draws: 3,
        awayWins: 3,
        avgGoals: 2.8
      }
    };
  }

  /**
   * Busca partidas do dia para uma liga
   */
  async fetchDailyMatches(league, date = new Date()) {
    // Implementar integração com API de fixtures
    const mockMatches = [
      {
        id: 'match_001',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        time: '15:00'
      },
      {
        id: 'match_002',
        homeTeam: 'Liverpool',
        awayTeam: 'Manchester United',
        time: '17:30'
      }
    ];

    return mockMatches;
  }

  /**
   * Avalia qualidade dos dados coletados
   */
  assessDataQuality(basicData, xgData, formData) {
    let quality = 1.0;

    if (!basicData.homeOdds || basicData.homeOdds === 0) quality -= 0.2;
    if (!xgData.homeXG || xgData.homeXG === 0) quality -= 0.3;
    if (!formData.homeForm) quality -= 0.2;

    return Math.max(0, quality);
  }

  /**
   * Valida dados com fonte secundária (SofaScore)
   */
  async validateWithSofaScore(matchData) {
    try {
      // Implementar validação cruzada
      return true;
    } catch (error) {
      console.error('Erro na validação SofaScore:', error.message);
      return false;
    }
  }
}

module.exports = DataFetcher;