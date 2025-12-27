const express = require('express');
const router = express.Router();
const {
  syncRepositoryPull,
  syncRepositoryPush,
  getLastSyncTime,
  updateSyncTimestamp
} = require('../config/github-sync');

// POST /api/sync - Faz pull/push com GitHub
router.post('/sync', async (req, res) => {
  try {
    const pullResult = await syncRepositoryPull();
    updateSyncTimestamp();
    res.json({ status: 'sincronizado', timestamp: pullResult.timestamp });
  } catch (err) {
    res.status(500).json({ status: 'erro', message: err.message });
  }
});

// GET /api/sync-status - Retorna última sincronização, arquivos pendentes, erros
router.get('/sync-status', (req, res) => {
  try {
    const lastSync = getLastSyncTime();
    // Para produção, adicione lógica para listar arquivos pendentes e erros
    res.json({
      lastSync,
      pendingFiles: [],
      errors: []
    });
  } catch (err) {
    res.status(500).json({ status: 'erro', message: err.message });
  }
});

// POST /api/sync-manual - Força sync manual
router.post('/sync-manual', async (req, res) => {
  try {
    const pullResult = await syncRepositoryPull();
    updateSyncTimestamp();
    // Log de operação pode ser salvo aqui
    res.json({ status: 'sincronizado-manualmente', timestamp: pullResult.timestamp });
  } catch (err) {
    res.status(500).json({ status: 'erro', message: err.message });
  }
});

module.exports = router;
