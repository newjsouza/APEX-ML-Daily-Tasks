# 🧠 APEX-ML DAILY TASKS

**Sistema Humanizado de Análise de Apostas Esportivas**

Banco de dados centralizado para automação de análises diárias com fundação filosófica (Olavo + Peterson) e rede neural mapeada (6+ nós, 27 apostas auditadas, 55.6% → 70% target).

---

## 📚 Estrutura do Repositório

```
APEX-ML-Daily-Tasks/
│
├─ README.md (este arquivo - guia de navegação)
├─ CHANGELOG.md (histórico de atualizações)
│
├─ daily-analysis/
│  ├─ system-prompt.md (🧠 Prompt mestre - LEIA PRIMEIRO)
│  ├─ vetos.md (🛑 Regras de bloqueio)
│  ├─ nos-neurais.md (🧠 Padrões reconhecidos)
│  └─ formato-saida.md (📋 Como estruturar resposta)
│
├─ documentation/
│  ├─ APEX_Fundacoes_Filosoficas.md
│  ├─ APEX_Analise_Historico.md
│  ├─ APEX_v2_0_Protocolo_Evolucao.md
│  ├─ APEX_Rede_Neural_Padroes.md
│  └─ APEX_Banco_Dados_Final.md
│
└─ exemplos/
   ├─ README.md (guia de interpretação)
   ├─ analise-exemplo-dia-1.md
   └─ analise-exemplo-dia-2.md
```

---

## 🚀 Como Usar Este Sistema

### **Para Perplexity (Automação Diária)**

1. **Crie uma tarefa diária/recorrente no Perplexity** com esta instrução:

```
Você é o sistema APEX-ML v2.0.

Leia COMPLETAMENTE os arquivos em:
https://raw.githubusercontent.com/newjsouza/APEX-ML-Daily-Tasks/main/daily-analysis/system-prompt.md

E também:
- https://raw.githubusercontent.com/newjsouza/APEX-ML-Daily-Tasks/main/daily-analysis/vetos.md
- https://raw.githubusercontent.com/newjsouza/APEX-ML-Daily-Tasks/main/daily-analysis/nos-neurais.md
- https://raw.githubusercontent.com/newjsouza/APEX-ML-Daily-Tasks/main/daily-analysis/formato-saida.md

Analise os jogos de HOJE e gere relatório completo seguindo o formato obrigatório.
```

2. **Perplexity lerá automaticamente** todos os arquivos do GitHub
3. **Gera relatório diário estruturado** com:
   - Jogos vetados (o que NÃO fazer)
   - Apostas recomendadas (análise completa)
   - Múltiplas sugeridas (seguras/moderadas/agressivas)

---

## 🔄 Fluxo de Atualização (A Mágica)

```
VOCÊ → Edita arquivo no GitHub → Commit → Push
                    ↓
              (GitHub atualiza)
                    ↓
PERPLEXITY → Lê versão nova automaticamente
                    ↓
           (SEM MEXER NA TAREFA!)
```

**Exemplo:**
- Descobre que Championship noturno tem 80% acerto
- Edita `nos-neurais.md` no GitHub
- Próxima análise já usa esse padrão
- Não precisou reescrever tarefa!

---

## 📊 Performance Esperada

| Versão | Taxa Acerto | ROI | Status |
|--------|-------------|-----|--------|
| v1.5 | 55.6% | +2-5% | ✅ Auditado |
| v2.0 | 62-70% | +8-15% | 🔄 Atual |
| v3.0 | 75%+ | +18-25% | 🎯 Target |

---

## 📖 Guia Rápido

| Arquivo | Para | Objetivo |
|---------|------|----------|
| `system-prompt.md` | Perplexity | Instruções gerais |
| `vetos.md` | Ambos | Bloqueios obrigatórios |
| `nos-neurais.md` | Ambos | Padrões e sinapses |
| `formato-saida.md` | Perplexity | Estrutura resposta |
| `documentation/` | Você | Teoria + Histórico |

---

## 🛠️ Como Editar

**Via GitHub Web:**
1. Navegue até arquivo
2. Clique no lápis (Edit)
3. Faça mudanças
4. Commit changes

**Via Git CLI:**
```bash
git clone https://github.com/newjsouza/APEX-ML-Daily-Tasks.git
cd APEX-ML-Daily-Tasks
# Edite arquivos
git add .
git commit -m "Atualização"
git push origin main
```

---

## 📋 Checklist de Implementação

- [x] Criar repositório no GitHub
- [x] Adicionar README.md
- [x] Adicionar system-prompt.md
- [x] Adicionar vetos.md
- [x] Adicionar nos-neurais.md
- [x] Adicionar formato-saida.md
- [x] Adicionar CHANGELOG.md
- [ ] Copiar documentação para /documentation/
- [ ] Criar tarefa no Perplexity
- [ ] Testar primeira análise
- [ ] ✅ Sistema operacional!

---

## 🎯 Filosofia

**Olavo de Carvalho:** Pensamento crítico, padrões profundos  
**Jordan Peterson:** Responsabilidade, honestidade com fatos  
**Rede Neural Transparente:** Cada decisão tem razão explícita

**"Reconhecemos padrões que o mercado ainda não viu."**

---

**Data:** 26/12/2025  
**Versão:** 2.0  
**Licença:** MIT
