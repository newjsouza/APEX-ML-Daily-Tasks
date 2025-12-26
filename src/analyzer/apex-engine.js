/**
 * APEX-ML Engine v2.0
 * Core de análise de apostas esportivas
 */

const { calculateEV, calculateConfidence } = require('./confidence-calculator');

class APEXEngine {
  constructor(config = {}) {
    this.baseConfidence = {
      'PL': 0.46,      // Taxa histórica Premier League
      'AFCON': 0.72,   // Taxa histórica AFCON
      'LALIGA': 0.52,
      'BUNDESLIGA': 0.48,
      'SERIEA': 0.50
    };

    this.minConfidence = config.minConfidence || 0.70;
    this.vetoRules = config.vetoRules || {};
  }

  /**
   * Analisa uma partida e retorna recomendação
   * @param {Object} matchData - Dados da partida
   * @returns {Object} Análise completa
   */
  analyzeMatch(matchData) {
    const {
      league,
      homeTeam,
      awayTeam,
      homeOdds,
      awayOdds,
      drawOdds,
      homeXG,
      awayXG,
      homeForm,
      awayForm,
      h2h
    } = matchData;

    // Verificar vetos automáticos
    const vetoCheck = this.checkVetos(matchData);
    if (vetoCheck.vetoed) {
      return {
        vetoed: true,
        reason: vetoCheck.reason,
        confidence: 0
      };
    }

    // Calcular múltiplos fatores
    const factors = this.calculateFactors(matchData);
    
    // Calcular confiança baseada em múltiplos critérios
    const confidence = calculateConfidence({
      league,
      xgDiff: Math.abs(homeXG - awayXG),
      formDiff: this.getFormDifference(homeForm, awayForm),
      h2hAdvantage: this.getH2HAdvantage(h2h),
      oddsImplied: this.getOddsImplied(homeOdds, awayOdds, drawOdds),
      baseRate: this.baseConfidence[league] || 0.50
    });

    // Calcular Expected Value
    const ev = calculateEV({
      confidence,
      odds: this.getBestOdds(matchData),
      stake: 100
    });

    // Determinar recomendação
    const recommendation = this.getRecommendation(matchData, factors);

    return {
      vetoed: false,
      confidence: Math.round(confidence * 100) / 100,
      ev: Math.round(ev * 100) / 100,
      recommendation,
      factors,
      stake: this.calculateStake(confidence),
      analysis: this.generateAnalysisText(matchData, factors)
    };
  }

  /**
   * Verifica regras de veto automático
   */
  checkVetos(matchData) {
    const { market, homeXG, awayXG, league } = matchData;

    // Veto: Over 2.5 isolado
    if (market === 'OVER_2_5' && !matchData.hasOtherMarkets) {
      return {
        vetoed: true,
        reason: 'Over 2.5 isolado - taxa histórica 25%'
      };
    }

    // Veto: Equilíbrio total (xG diferença 0.0)
    if (Math.abs(homeXG - awayXG) < 0.05) {
      return {
        vetoed: true,
        reason: 'Equilíbrio total detectado (xG diff < 0.05)'
      };
    }

    // Veto: BTTS em AFCON
    if (league === 'AFCON' && market === 'BTTS') {
      return {
        vetoed: true,
        reason: 'Ambas marcam eliminadas em AFCON'
      };
    }

    // Veto: Dados não validados
    if (!matchData.validated || matchData.dataQuality < 0.8) {
      return {
        vetoed: true,
        reason: 'Dados não validados ou qualidade insuficiente'
      };
    }

    return { vetoed: false };
  }

  /**
   * Calcula múltiplos fatores de análise
   */
  calculateFactors(matchData) {
    return {
      xgAdvantage: this.calculateXGAdvantage(matchData),
      formTrend: this.calculateFormTrend(matchData),
      h2hPattern: this.calculateH2HPattern(matchData),
      homeAdvantage: this.calculateHomeAdvantage(matchData),
      motivation: this.assessMotivation(matchData),
      injuries: this.assessInjuries(matchData)
    };
  }

  calculateXGAdvantage(data) {
    const diff = data.homeXG - data.awayXG;
    return {
      value: diff,
      weight: 0.25,
      description: diff > 0.5 ? 'Forte vantagem ofensiva' : 'Equilíbrio ofensivo'
    };
  }

  calculateFormTrend(data) {
    const homePoints = this.formToPoints(data.homeForm);
    const awayPoints = this.formToPoints(data.awayForm);
    return {
      home: homePoints,
      away: awayPoints,
      weight: 0.20,
      description: `Casa: ${homePoints}pts | Fora: ${awayPoints}pts`
    };
  }

  calculateH2HPattern(data) {
    if (!data.h2h || data.h2h.length === 0) {
      return { value: 0, weight: 0.10, description: 'Sem histórico' };
    }
    return {
      value: data.h2h.homeWins / data.h2h.total,
      weight: 0.15,
      description: `${data.h2h.homeWins}V-${data.h2h.draws}E-${data.h2h.awayWins}D`
    };
  }

  calculateHomeAdvantage(data) {
    return {
      value: data.homeStats?.winRate || 0.5,
      weight: 0.15,
      description: 'Fator casa considerado'
    };
  }

  assessMotivation(data) {
    let motivation = 'Normal';
    if (data.isTopMatch) motivation = 'Alta';
    if (data.isRelegationBattle) motivation = 'Crítica';
    return {
      level: motivation,
      weight: 0.10,
      description: `Motivação: ${motivation}`
    };
  }

  assessInjuries(data) {
    const homeInjuries = data.homeInjuries || 0;
    const awayInjuries = data.awayInjuries || 0;
    return {
      home: homeInjuries,
      away: awayInjuries,
      weight: 0.05,
      description: `Lesões: Casa ${homeInjuries} | Fora ${awayInjuries}`
    };
  }

  formToPoints(form) {
    if (!form) return 0;
    return form.split('').reduce((acc, result) => {
      if (result === 'W') return acc + 3;
      if (result === 'D') return acc + 1;
      return acc;
    }, 0);
  }

  getFormDifference(homeForm, awayForm) {
    return this.formToPoints(homeForm) - this.formToPoints(awayForm);
  }

  getH2HAdvantage(h2h) {
    if (!h2h || h2h.length === 0) return 0;
    return (h2h.homeWins - h2h.awayWins) / h2h.total;
  }

  getOddsImplied(homeOdds, awayOdds, drawOdds) {
    const total = (1/homeOdds) + (1/awayOdds) + (1/drawOdds);
    return {
      home: (1/homeOdds) / total,
      away: (1/awayOdds) / total,
      draw: (1/drawOdds) / total
    };
  }

  getBestOdds(matchData) {
    return Math.max(matchData.homeOdds, matchData.awayOdds, matchData.drawOdds);
  }

  getRecommendation(matchData, factors) {
    const { homeTeam, awayTeam } = matchData;
    
    if (factors.xgAdvantage.value > 0.5 && factors.formTrend.home > factors.formTrend.away) {
      return `${homeTeam} Vitória`;
    } else if (factors.xgAdvantage.value < -0.5 && factors.formTrend.away > factors.formTrend.home) {
      return `${awayTeam} Vitória`;
    } else {
      return `Empate ou Dupla Chance`;
    }
  }

  calculateStake(confidence) {
    if (confidence >= 0.80) return 150;
    if (confidence >= 0.75) return 125;
    if (confidence >= 0.70) return 100;
    return 0;
  }

  generateAnalysisText(matchData, factors) {
    const lines = [];
    lines.push(`${matchData.homeTeam} vs ${matchData.awayTeam}`);
    lines.push(`Liga: ${matchData.league}`);
    lines.push(`\nFatores de Análise:`);
    lines.push(`- xG: ${factors.xgAdvantage.description}`);
    lines.push(`- Forma: ${factors.formTrend.description}`);
    lines.push(`- H2H: ${factors.h2hPattern.description}`);
    lines.push(`- ${factors.motivation.description}`);
    lines.push(`- ${factors.injuries.description}`);
    return lines.join('\n');
  }
}

module.exports = APEXEngine;