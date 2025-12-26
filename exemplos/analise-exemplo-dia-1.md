# ANÁLISE 26/12/2025 (EXEMPLO) - APEX-ML v2.0

**Status:** Exemplo ilustrativo (dados fictícios para demonstração)

---

## 🛑 JOGOS VETADOS (2)

### ❌ Liverpool vs Manchester City (Premier League)
- **Veto:** VETO 2 - PL com xG ambíguo
- **Detalhe:** Liverpool xG 1.8 vs Man City xG 1.6 (diferença 0.2 < 0.5)
- **Taxa base PL:** 46%
- **Taxa PL ambíguo:** ~30%
- **Alternativa:** Aguardar xG diferença > 0.8 ou usar Chance Dupla 1X
- **Status:** BLOQUEADO

### ❌ Arsenal vs Chelsea - Over 2.5 (Premier League)
- **Veto:** VETO 1 - Over/Under puro
- **Detalhe:** Aposta simples em Over 2.5 (taxa histórica 25%)
- **Odds:** 1.85
- **Alternativa:** Combine com "Handicap Arsenal +1" em múltipla
- **Status:** BLOQUEADO

---

## ✅ APOSTAS RECOMENDADAS (2)

### ⚽ Coventry City vs Leeds United - Championship
**Horário:** 15:00 UTC-3

#### 📋 Análise Técnica
**xG Esperado:**
- Coventry: 1.9 xG | Mandante, ataque agressivo em casa
- Leeds: 1.2 xG | Visitante, defesa fechada mas ineficaz
- **Diferença:** 0.7 xG (CLARO)

**Últimos Resultados:**
- Coventry: W-W-D-W (invicto em 4 jogos)
- Leeds: L-D-W-L (inconsistente)

#### 🎯 Aposta Recomendada
- **Mercado:** Handicap +1
- **Time:** Coventry City
- **Odds:** 1.65

#### 📊 Análise APEX
- **Nó Neural Ativo:** Championship + Handicap +1
- **Taxa Histórica:** 75%
- **Confiança Calculada:** 76%
- **Ajustes Aplicados:**
  - Championship: 0% (nó confiável)
  - xG diferença 0.7: +1% (spread bom)
  - Motivação: Coventry em série vitória

**Razão da Recomendação:**  
Championship + Handicap é padrão APEX com 75% de acerto. Coventry tem xG de ataque forte (1.9) vs xGA de Leeds (1.2). Handicap +1 reduz variância. Sinapse Championship + Handicap tem peso 0.92 (excelente).

#### 💰 Gestão de Risco
- **Stake Recomendado:** 4% da banca
- **EV Esperado:** +15%

#### 🗣️ Contexto
Coventry subiu de posição após novo treinador. Leeds está em crise de confiança. Sem lesões reportadas.

---

### ⚽ Senegal vs Camerões - Copa Africana (AFCON)
**Horário:** 14:00 UTC-3

#### 📋 Análise Técnica
**xG Esperado:**
- Senegal: 2.1 xG | Casa, favorito, ataque forte
- Camerões: 1.3 xG | Visitante, defesa compacta
- **Diferença:** 0.8 xG (CLARO)

**Últimos Resultados:**
- Senegal: W-W-W-D (série positiva)
- Camerões: D-L-W-D (instável)

#### 🎯 Aposta Recomendada
- **Mercado:** Handicap +1
- **Time:** Senegal
- **Odds:** 1.50

#### 📊 Análise APEX
- **Nó Neural Ativo:** AFCON + Handicap +1
- **Taxa Histórica:** 75%
- **Confiança Calculada:** 80%
- **Ajustes Aplicados:**
  - AFCON: +5% (bonus liga)
  - xG diferença 0.8: +5% (spread excelente)
  - Sem lesões: 0%

**Razão da Recomendação:**  
AFCON + Handicap +1 é a sinapse MÁXIMA do APEX (peso 0.95). Taxa histórica de 75% com bonus de +5% por liga. xG diferença de 0.8 confirma vantagem clara. Confiança final 80% = ALTA.

#### 💰 Gestão de Risco
- **Stake Recomendado:** 5% da banca
- **EV Esperado:** +20%

#### 🗣️ Contexto
Senegal jogando em casa com torcida massiva. Camerões com 2 jogadores suspensos por cartões.

---

## 🦧 MÚLTIPLAS SUGERIDAS (1)

### Múltipla 1: Dupla Segura (Championship + AFCON)
**Tipo:** Segura  
**Stake:** 3% da banca

| # | Jogo | Mercado | Odds | Confiança |
|---|------|---------|------|----------|
| 1 | Coventry vs Leeds | Handicap +1 Coventry | 1.65 | 76% |
| 2 | Senegal vs Camerões | Handicap +1 Senegal | 1.50 | 80% |

**Odds Combinada:** 1.65 × 1.50 = **2.48**  
**Confiança Combinada:** (76% + 80%) / 2 = **78%**  
**EV Esperado:** +24%

**Razão:**  
Ambos em ligas com padrões APEX fortes (Championship 75%, AFCON 75%). Correlação baixa (países e contextos diferentes). Handicap +1 em ambos reduz variância. Confiança combinada 78% = ALTA.

**Correlação:** NEGATIVA (se Championship erra, não afeta AFCON)

---

## 📋 RESULTADOS REAIS (Atualizar após jogos)

### Apostas Simples
- **Coventry vs Leeds (Handicap +1 Cov):** [Aguardando jogo]
- **Senegal vs Camerões (Handicap +1 Sen):** [Aguardando jogo]

**Taxa:** [A calcular após jogos]

### Múltiplas
- **Múltipla 1 (Dupla Segura):** [Aguardando jogos]

---

## 🎯 LIÇÕES APRENDIDAS (Preencher após resultados)

### Acertos
- [O que funcionou bem]

### Erros
- [O que pode melhorar]

### Ajustes no Sistema
- [ ] Atualizar peso sinapse se necessário
- [ ] Criar novo veto se padrão aparecer
- [ ] Ajustar confiança base de nó

---

**Este é um exemplo ilustrativo. Use como referência de formato e estrutura.**
