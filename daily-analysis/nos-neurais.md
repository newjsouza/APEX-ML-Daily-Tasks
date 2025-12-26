# 🧠 NÓS NEURAIS - APEX-ML v2.0

## O QUE SÃO NÓS?

Nós são **padrões reconhecidos** em dados históricos para calcular confiança em tempo real.

Cada nó tem:
- **Taxa de Acerto:** % histórico
- **Peso:** Importância
- **Ativação:** Quando "acorda"
- **Sinapses:** Conexões com outros nós

---

## 🔴 NÓ 1: AFCON (Copa África)

### Dados
- **Taxa:** 75%
- **Amostra:** 8 apostas
- **Acertos:** 6 de 8
- **Peso:** MÁXIMO (0.95)

### Ativação
- Liga = AFCON
- Tipo = Handicap +1 ou Chance Dupla
- xG diff > 0.5

### Sinapses
```
AFCON + Handicap +1 → Peso 0.95 (MÁXIMA)
AFCON + Chance Dupla → Peso 0.80
AFCON + Over/Under → BLOQUEADO
```

### Interpretação
**AFCON + Handicap = zona de conforto máximo**  
Confiança base 75%, ajustada por xG

---

## 🔵 NÓ 2: PREMIER LEAGUE

### Dados
- **Taxa:** 46%
- **Amostra:** 13 apostas
- **Acertos:** 6 de 13
- **Peso:** BAIXO (0.46)
- **Penalidade:** -10%

### Ativação
- Liga = Premier League
- Qualquer tipo (com cautela)

### Sinapses
```
PL + xG claro (>0.8) + Handicap → Peso 0.70 (OK)
PL + xG ambíguo (<0.5) → VETO (-0.99)
PL + Over/Under → VETO (-0.99)
```

### Interpretação
**PL = zona de risco**  
Sempre aplique penalidade -10%

---

## 🟢 NÓ 3: CHAMPIONSHIP

### Dados
- **Taxa:** 75%
- **Amostra:** 4 apostas
- **Acertos:** 3 de 4
- **Peso:** ALTO (0.75)

### Ativação
- Liga = Championship
- Tipo = Handicap, Resultado
- xG diff > 0.6

### Sinapses
```
Championship + Handicap +1 → Peso 0.92 (EXCELENTE)
Championship + Resultado → Peso 0.78
Championship + Over → Peso 0.60
```

### Interpretação
**Championship = sweet spot**  
Mais previsível que PL, menos variância

---

## 🟡 NÓ 4: HANDICAP +1

### Dados
- **Taxa:** 75%
- **Amostra:** 4 apostas
- **Acertos:** 3 de 4
- **Peso:** UNIVERSAL (0.75)

### Ativação
- Tipo = "Handicap +1"
- Qualquer liga (com ajustes)

### Sinapses
```
Handicap +1 + AFCON → Peso 0.95 (MÁXIMO)
Handicap +1 + Championship → Peso 0.92
Handicap +1 + PL → Peso 0.70 (com penalidade)
```

### Por que funciona?
- Margem de 1 gol amortece erros
- Menos sensível a arbitraçem
- Funciona em qualquer liga

---

## 🟣 NÓ 5: CHANCE DUPLA

### Dados
- **Taxa:** 67%
- **Amostra:** 9 apostas
- **Acertos:** 6 de 9
- **Peso:** MÉDIO (0.67)

### Ativação
- Tipo = "Chance Dupla 1X/X2"
- Qualquer liga

### Sinapses
```
Chance Dupla + PL + xG claro → Peso 0.75
Chance Dupla + AFCON → Peso 0.70
Chance Dupla + Over → Peso 0.65
```

### Interpretação
**Mercado conservador**  
Cobre 2 de 3 resultados, odd menor

---

## ❌ NÓ 6: OVER/UNDER (VETO)

### Dados
- **Taxa:** 25%
- **Amostra:** 8 apostas
- **Acertos:** 2 de 8
- **Peso:** BLOQUEADO (-0.99)
- **Status:** VETO PERMANENTE

### Interpretação
**Over/Under = loteria, não análise**  
25% = pior que acaso  
**NUNCA ISOLADO**

---

## 📋 USO PRÁTICO

**Exemplo:**
```
Jogo: Liverpool (PL) vs Brighton
xG: Liverpool 2.1, Brighton 0.9 (diff 1.2)
Tipo: Handicap +1 Liverpool
Odds: 1.65

Nós ativos:
├─ NÓ PL: 46%, penalidade -10%
├─ NÓ HANDICAP: 75%, universal
├─ Sinapse (PL + Handicap): peso 0.70
├─ xG claro (1.2 > 0.8): +5% bonus
└─ Confiança Final: ~68%

Resultado: ACEITA com stake 3-5%
```

---

## 📋 TABELA RÁPIDA

| Situação | Nós | Confiança | Ajuste | Resultado |
|----------|------|-----------|--------|----------|
| AFCON + Handicap | N1+N4 | 75% | +5% xG | 80%+ FORTE |
| Championship + Handicap | N2+N4 | 75% | Normal | 75% FORTE |
| PL + Handicap + xG claro | N3+N4 | 46% | -10%+5% | 68% MÉDIO |
| PL + Over | N3+N6 | VETO | VETO | ❌ BLOQUEADO |
| Chance Dupla | N5 | 67% | Liga | 65-75% |

---

**Use esta referência ao analisar cada jogo.**
