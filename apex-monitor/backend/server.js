// Copie tudo isto ↓↓↓
// ============================================================================
// APEX MONITOR - BACKEND SERVER (PRODUCTION READY)
// ============================================================================
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'newjsouza/APEX-ML-Daily-Tasks';

const cache = {
  analyses: null,
  timestamp: null,
  cacheDuration: 5 * 60 * 1000
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ENDPOINTS
app.get('/api/latest-analysis', async (req, res) => {
  try {
    const data = await fetchLatestAnalysis();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/analyses', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const data = await fetchAnalyses(page);
    res.json({ success: true, data, page });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await calculateStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    github: GITHUB_REPO
  });
});

app.post('/api/webhook', (req, res) => {
  const event = req.headers['x-github-event'];
  console.log(`📡 GitHub Webhook: ${event}`);
  if (event === 'push') {
    cache.analyses = null;
    cache.timestamp = null;
  }
  res.json({ received: true });
});

app.get('/api/config', (req, res) => {
  res.json({
    repo: GITHUB_REPO,
    cacheDuration: cache.cacheDuration,
    updateInterval: 5 * 60 * 1000
  });
});

async function fetchLatestAnalysis() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const analysisFiles = response.data
      .filter(f => f.name.includes('analise') || f.name.includes('analysis'))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (analysisFiles.length === 0) {
      return {
        id: 'demo',
        date: new Date().toISOString(),
        title: 'Última Análise APEX',
        message: 'Nenhuma análise encontrada no repositório'
      };
    }

    const latestFile = analysisFiles[0];
    const contentResponse = await axios.get(latestFile.url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });

    return {
      id: latestFile.sha,
      filename: latestFile.name,
      date: latestFile.updated_at,
      size: latestFile.size,
      url: latestFile.html_url,
      preview: contentResponse.data.substring(0, 500)
    };
  } catch (error) {
    throw new Error(`GitHub API: ${error.message}`);
  }
}

async function fetchAnalyses(page = 1) {
  if (cache.analyses && cache.timestamp && 
      Date.now() - cache.timestamp < cache.cacheDuration) {
    return cache.analyses;
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const items = response.data
      .filter(f => f.type === 'file')
      .map(f => ({
        id: f.sha,
        name: f.name,
        size: f.size,
        updated: f.updated_at,
        url: f.html_url,
        download: f.download_url
      }))
      .sort((a, b) => new Date(b.updated) - new Date(a.updated));

    const result = {
      total: items.length,
      page,
      items: items.slice((page - 1) * 10, page * 10)
    };

    cache.analyses = result;
    cache.timestamp = Date.now();
    return result;
  } catch (error) {
    throw error;
  }
}

async function calculateStats() {
  try {
    const data = await fetchAnalyses();
    return {
      totalAnalyses: data.total,
      averageFileSize: Math.round(
        data.items.reduce((sum, item) => sum + item.size, 0) / data.items.length
      ),
      lastUpdate: data.items[0]?.updated || new Date().toISOString(),
      cacheHitRate: cache.analyses ? '100%' : '0%',
      serverUptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return { error: error.message, timestamp: new Date().toISOString() };
  }
}

app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({ success: false, error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     🎯 APEX MONITOR - BACKEND RODANDO     ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔗 GitHub: ${GITHUB_REPO}`);
  console.log(`⚙️  Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📚 Endpoints:');
  console.log('  GET  /api/latest-analysis .... Última análise');
  console.log('  GET  /api/analyses ........... Todas análises');
  console.log('  GET  /api/stats ............. Estatísticas');
  console.log('  GET  /api/health ............ Status servidor');
  console.log('  POST /api/webhook ........... GitHub Webhook');
  console.log('  GET  /api/config ............ Configuração');
  console.log('');
  console.log('💡 Abra http://localhost:' + PORT + ' no navegador!');
  console.log('');
});

module.exports = app;
