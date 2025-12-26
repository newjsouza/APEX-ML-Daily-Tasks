# 📋 FORMATO OBRIGATÓRIO DE SAÍDA - APEX-ML

Use este template EXATAMENTE.

---

## CABEçALHO

```
═════════════════════════════════════════════
🎯 ANÁLISE DIÁRIA APEX-ML
Data: [DATA]
Horário: [HORÁRIO UTC-3]
Mercados Analisados: [N]
Apostas Recomendadas: [N]
═════════════════════════════════════════════
```

---

## SEÇÃO 1: 🛑 JOGOS VETADOS

**Formato:**
```
❌ [Time A] vs [Time B] ([Liga])
   Motivo: [Veto]
   Detalhe: [Info]
   Odds: [Valor]
```

**Exemplo:**
```
❌ Liverpool vs Man City (Premier League)
   Motivo: VETO 2 - PL xG ambíguo
   Detalhe: Liverpool 1.8 vs City 1.7 (diff 0.1)
   Obs: Aguardar xG > 0.8
```

---

## SEÇÃO 2: ✅ APOSTAS RECOMENDADAS

**Formato:**
```
⚽ [TIME A] vs [TIME B] - [LIGA]
   Horário: [Hora]

   📋 Análise Técnica
   xG Esperado:
   • [Time A]: [Valor] | [Contexto]
   • [Time B]: [Valor] | [Contexto]
   • Diferença: [Valor] (Claro/Ambíguo)
   
   Últimos:
   • [Time A]: [W-D-L-W]
   • [Time B]: [W-W-L-D]

   🎯 Aposta
   • Mercado: [Tipo]
   • Time: [Qual]
   • Odds: [Valor]

   📊 APEX
   • Nó: [Nome]
   • Taxa: [%]
   • Confiança: [%]
   • Ajustes:
     - Liga: [±%]
     - xG: [±%]
   
   Razão: [1-2 frases]

   💰 Risco
   • Stake: [%]
   • EV: [%]
```

**Exemplo Completo:**
```
⚽ Coventry vs Leeds - Championship
   Horário: 15:00 UTC-3

   📋 Análise Técnica
   xG:
   • Coventry: 1.9 | Ataque agressivo
   • Leeds: 1.2 | Defesa fechada
   • Diferença: 0.7 (Claro)
   
   Últimos:
   • Coventry: W-W-D-W
   • Leeds: L-D-W-L

   🎯 Aposta
   • Mercado: Handicap +1
   • Time: Coventry
   • Odds: 1.65

   📊 APEX
   • Nó: Championship + Handicap
   • Taxa: 75%
   • Confiança: 76%
   • Ajustes:
     - Liga: 0%
     - xG: +1%
   
   Razão: Championship + Handicap é padrão 75%. 
   Coventry xG 1.9 forte. Sinapse peso 0.92.

   💰 Risco
   • Stake: 4%
   • EV: +15%
```

---

## SEÇÃO 3: 🦧 MÚLTIPLAS

**Formato:**
```
🦧 Múltipla [N]: [Nome]
Tipo: [Segura/Moderada/Agressiva]
Stake: [%]

| # | Jogo | Mercado | Odds | Conf% |
|---|------|---------|------|-------|
| 1 | [Jogo] | [Tipo] | [Odd] | [%] |
| 2 | [Jogo] | [Tipo] | [Odd] | [%] |

Odds Combinada: [Mult]
Confiança: [Média %]
EV: [%]
Razão: [Por que juntas]
```

**Exemplo:**
```
🦧 Múltipla 1: Dupla Segura Championship
Tipo: Segura
Stake: 3%

| # | Jogo | Mercado | Odds | Conf% |
|---|------|---------|------|-------|
| 1 | Coventry vs Leeds | Handicap +1 Cov | 1.65 | 76% |
| 2 | Bristol vs Southampton | 1X Bristol | 1.52 | 71% |

Odds Combinada: 2.51
Confiança: 73.5%
EV: +18%
Razão: Ambos Championship com padrões claros. 
Correlação baixa (cidades diferentes).
```

---

## FOOTER

```
═════════════════════════════════════════════
📋 APEX-ML v2.0
📄 Próxima: [DATA]
🔗 github.com/newjsouza/APEX-ML-Daily-Tasks
═════════════════════════════════════════════
```
