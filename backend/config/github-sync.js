const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;
const GITHUB_REPO = process.env.GITHUB_REPO;
const DATA_PATH = process.env.DATA_PATH || './data';

let lastSyncTime = null;

function initGithubClient() {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN não definido no .env');
  return new Octokit({ auth: GITHUB_TOKEN });
}

async function syncRepositoryPull() {
  // Simples: para produção, use git CLI ou nodegit para clone/pull real
  // Aqui, apenas simula atualização local
  lastSyncTime = new Date().toISOString();
  return { status: 'pull-simulado', timestamp: lastSyncTime };
}

async function syncRepositoryPush(filePath, commitMessage = 'Atualização automática via API') {
  // Simples: para produção, use git CLI ou nodegit para push real
  // Aqui, apenas simula push
  lastSyncTime = new Date().toISOString();
  return { status: 'push-simulado', file: filePath, timestamp: lastSyncTime };
}

async function getAnalysesFromGithub(date = null) {
  // Lê arquivos JSON de análises
  const dir = path.join(DATA_PATH, 'analyses');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  if (date) {
    const file = files.find(f => f.includes(date));
    if (!file) return null;
    return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  }
  return files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

async function pushAnalysisToGithub(date, analysisData) {
  // Salva análise localmente e simula push
  const dir = path.join(DATA_PATH, 'analyses');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${date}.json`);
  fs.writeFileSync(filePath, JSON.stringify(analysisData, null, 2));
  return await syncRepositoryPush(filePath, `Análise do dia ${date}`);
}

function getLastSyncTime() {
  return lastSyncTime;
}

function updateSyncTimestamp() {
  lastSyncTime = new Date().toISOString();
  return lastSyncTime;
}

module.exports = {
  initGithubClient,
  syncRepositoryPull,
  syncRepositoryPush,
  getAnalysesFromGithub,
  pushAnalysisToGithub,
  getLastSyncTime,
  updateSyncTimestamp
};
