// app.js - Funções principais do APEX Monitor

// Exemplo: Carregar dados dinâmicos (substitua por integração real)
document.addEventListener('DOMContentLoaded', function() {
  // Exemplo: carregar métricas, apostas, imagens, notícias, etc.
  // fetch('/api/analyses').then(...)
});

// Função para navegação entre páginas (SPA simplificado)
function navigateTo(page) {
  window.location.href = page;
}

// IA: Botão para abrir página de geração
if (document.getElementById('btn-open-ai-gen')) {
  document.getElementById('btn-open-ai-gen').onclick = function() {
    window.location.href = 'pages/ai-generation.html';
  };
}

// Atualiza status da IA no dashboard
async function updateAIStatusCard() {
  try {
    const res = await fetch('/api/analyses?days=1');
    const data = await res.json();
    if (data.analyses && data.analyses.length > 0) {
      const last = data.analyses[data.analyses.length - 1];
      document.getElementById('ai-last-date').textContent = last.data || '--';
      document.getElementById('ai-last-bets').textContent = last.analysis?.apostas_sugeridas || '--';
      document.getElementById('ai-last-status').textContent = 'Atualizado';
      document.getElementById('ai-last-status').className = 'badge bg-success';
      document.getElementById('ai-data-source').textContent = 'Perplexity AI ✓';
      document.getElementById('ai-data-source').className = 'badge bg-success';
    }
  } catch (e) {
    // fallback: mantém como GitHub Sync
  }
}
if (document.getElementById('ai-status-card')) updateAIStatusCard();

// Funções para página de geração IA
function initAIGenerationPage() {
  const form = document.getElementById('ai-analysis-form');
  const progress = document.getElementById('ai-progress');
  const progressBar = document.getElementById('ai-progress-bar');
  const progressStage = document.getElementById('ai-progress-stage');
  const resultDiv = document.getElementById('ai-result');
  const historyDiv = document.getElementById('ai-history');

  form.onsubmit = async function(e) {
    e.preventDefault();
    // Coleta dados do formulário
    const date = document.getElementById('analysis-date').value;
    const leagues = Array.from(form.querySelectorAll('input[type=checkbox][id^=liga-]:checked')).map(cb => cb.value).join(',');
    // Exibe progresso
    progress.style.display = '';
    progressBar.style.width = '10%';
    progressBar.textContent = 'Conectando à IA...';
    progressStage.textContent = 'Conectando à IA...';
    resultDiv.style.display = 'none';
    // Chama backend
    try {
      progressBar.style.width = '40%';
      progressBar.textContent = 'Analisando jogos...';
      progressStage.textContent = 'Analisando jogos...';
      const res = await fetch(`/api/generate-analysis?date=${date}&leagues=${leagues}`, { method: 'POST' });
      progressBar.style.width = '80%';
      progressBar.textContent = 'Processando resposta...';
      progressStage.textContent = 'Processando resposta...';
      const data = await res.json();
      progressBar.style.width = '100%';
      progressBar.textContent = 'Finalizado!';
      progressStage.textContent = 'Análise gerada!';
      // Exibe resultado
      resultDiv.style.display = '';
      resultDiv.innerHTML = `<div class='card p-4'><h4>Resultado IA</h4><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
      // Atualiza histórico
      loadAIHistory();
    } catch (err) {
      progressBar.style.width = '100%';
      progressBar.className = 'progress-bar bg-danger';
      progressBar.textContent = 'Erro!';
      progressStage.textContent = 'Erro ao gerar análise.';
      resultDiv.style.display = '';
      resultDiv.innerHTML = `<div class='alert alert-danger'>Erro ao gerar análise: ${err.message}</div>`;
    }
  };
  // Carrega histórico
  loadAIHistory();
}

function loadAIHistory() {
  const historyDiv = document.getElementById('ai-history');
  fetch('/api/analyses?days=5').then(r => r.json()).then(data => {
    if (data.analyses && data.analyses.length > 0) {
      let html = '<h5>Últimas 5 análises geradas</h5><ul class="list-group">';
      data.analyses.forEach(a => {
        html += `<li class="list-group-item">${a.data || '--'} | Ligas: ${a.analysis?.leagues || '--'} | Status: <span class='badge bg-success'>OK</span></li>`;
      });
      html += '</ul>';
      historyDiv.innerHTML = html;
    } else {
      historyDiv.innerHTML = '';
    }
  });
}

// Exporta para uso inline
window.initAIGenerationPage = initAIGenerationPage;
