// feedback.js - Mensagens de erro, sucesso e alerta para o APEX Monitor

function showFeedback(message, type = 'info', timeout = 4000) {
  // type: 'success', 'error', 'warning', 'info'
  const feedback = document.createElement('div');
  feedback.className = `feedback-message ${type}`;
  feedback.textContent = message;
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.classList.add('fade-out');
    setTimeout(() => feedback.remove(), 500);
  }, timeout);
}

// Exemplo de uso:
// showFeedback('Aposta salva com sucesso!', 'success');
// showFeedback('Erro ao carregar dados.', 'error');
