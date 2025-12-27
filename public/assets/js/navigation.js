// navigation.js - Lógica de navegação modular

function goBack() {
  window.history.back();
}

// Exemplo: navegação para páginas específicas
function goToDashboard() {
  window.location.href = '/index.html';
}
function goToDailyAnalysis() {
  window.location.href = '/pages/daily-analysis.html';
}
function goToMatchDetails() {
  window.location.href = '/pages/match-details.html';
}
function goToBetsHistory() {
  window.location.href = '/pages/bets-history.html';
}
function goToMultiplesBingos() {
  window.location.href = '/pages/multiples-bingos.html';
}
function goToNews() {
  window.location.href = '/pages/news.html';
}
function goToImages() {
  window.location.href = '/pages/images.html';
}
function goToAbout() {
  window.location.href = '/pages/about.html';
}

// Função para navegação por abas usando Bootstrap
function activateTab(tabId) {
  var tabTrigger = document.querySelector('[data-bs-target="#' + tabId + '"]');
  if (tabTrigger) {
    var tab = new bootstrap.Tab(tabTrigger);
    tab.show();
  }
}
// Exemplo de uso: activateTab('analises-tab');
