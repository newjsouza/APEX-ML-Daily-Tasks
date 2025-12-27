const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importação das rotas
const syncRoutes = require('./routes/api-sync');
const imagesRoutes = require('./routes/api-images');
const analysesRoutes = require('./routes/api-analyses');
// const dailyTasksRoutes = require('./routes/api-daily-tasks'); // Crie este arquivo depois

// Registro das rotas
app.use('/api', syncRoutes);
app.use('/api', imagesRoutes);
app.use('/api', analysesRoutes);
// app.use('/api', dailyTasksRoutes); // Ative quando criar

// Error handling global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`APEX Monitor v2 rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
