/**
 * APEX-ML Main Entry Point
 */

const APEXEngine = require('./analyzer/apex-engine');
const DataFetcher = require('./analyzer/data-fetcher');
const HTMLReportGenerator = require('./generators/html-report-generator');
const logger = require('./utils/logger');
require('dotenv').config();

async function main() {
  try {
    logger.info('🚀 Iniciando APEX-ML Analysis...');

    // Inicializar componentes
    const engine = new APEXEngine({
      minConfidence: parseFloat(process.env.MIN_CONFIDENCE) || 0.70
    });

    const fetcher = new DataFetcher();
    const generator = new HTMLReportGenerator();

    // Buscar partidas do dia
    logger.info('🔍 Buscando partidas do dia...');
    const leagues = ['PL', 'AFCON', 'LALIGA'];
    const allMatches = [];

    for (const league of leagues) {
      const matches = await fetcher.fetchDailyMatches(league);
      allMatches.push(...matches.map(m => ({ ...m, league })));
    }

    logger.info(`✅ ${allMatches.length} partidas encontradas`);

    // Analisar cada partida
    const analyses = [];
    for (const match of allMatches) {
      logger.info(`📊 Analisando: ${match.homeTeam} vs ${match.awayTeam}`);
      
      const matchData = await fetcher.fetchMatchData(match.id, match.league);
      if (!matchData) {
        logger.warn(`⚠️  Dados insuficientes para ${match.id}`);
        continue;
      }

      const analysis = engine.analyzeMatch(matchData);
      
      if (!analysis.vetoed && analysis.confidence >= engine.minConfidence) {
        analyses.push({
          match: matchData,
          analysis
        });
        logger.success(`✅ Recomendação: ${analysis.recommendation} (${(analysis.confidence * 100).toFixed(1)}%)`);
      } else if (analysis.vetoed) {
        logger.warn(`🚫 Vetado: ${analysis.reason}`);
      } else {
        logger.info(`⚪ Confiança insuficiente: ${(analysis.confidence * 100).toFixed(1)}%`);
      }
    }

    // Gerar relatório HTML
    if (analyses.length > 0) {
      logger.info(`📄 Gerando relatório com ${analyses.length} recomendações...`);
      const reportPath = await generator.generate(analyses);
      logger.success(`✅ Relatório salvo em: ${reportPath}`);
    } else {
      logger.warn('⚠️  Nenhuma recomendação com confiança > 70%');
    }

    logger.success('✅ Análise concluída!');
  } catch (error) {
    logger.error(`❌ Erro na execução: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };