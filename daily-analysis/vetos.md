# 🛑 BIBLIOTECA COMPLETA DE VETOS - APEX-ML v2.0

## O QUE SÃO VETOS?

Vetos são **bloqueios automáticos** que protegem sua banca de apostas com baixa taxa histórica ou alto risco.

**Filosofia:** "Reconhecer o que NÃO sabemos é tão importante quanto o que sabemos. Vetos são humildade codificada." - Olavo de Carvalho

---

## 🚨 VETOS OBRIGATÓRIOS (Não Negociáveis)

### ❌ VETO 1: Over/Under Puro

**Descrição:** Aposta APENAS em "Over 2.5" ou "Under 2.5" sem combinação

**Dados:**
- Taxa: **25%** (2 de 8)
- ROI: **-40%**
- Variância: ALTA

**Por quê?**
- Taxa abaixo do acaso
- Fatores não modeláveis: arbitração, clima, sorte
- Sem padrão reconhecível

**Código:**
```python
SE tipo in ['Over 2.5', 'Under 2.5']
   E simples = True
ENTÃO: BLOQUEIE ("VETO 1: Over/Under puro 25%")
```

**Alternativa:**
✅ "Over 2.5 + Handicap +1" (múltipla)

---

### ❌ VETO 2: Premier League com xG Ambíguo

**Descrição:** PL onde |xG_A - xG_B| < 0.5

**Dados:**
- Taxa PL geral: **46%**
- Taxa PL xG ambíguo: **~30%**

**Por quê?**
- PL já tem taxa baixa
- xG ambíguo = sem vantagem clara
- Alta variância (zebras frequentes)

**Código:**
```python
SE liga = "Premier League"
   E abs(xG_A - xG_B) < 0.5
ENTÃO: BLOQUEIE ("VETO 2: PL ambígua xG < 0.5")
```

---

### ❌ VETO 3: Odds < 1.40 em Simples

**Descrição:** Aposta simples com odd < 1.40

**Matemática:**
- Odd 1.40 = 71% prob implícita
- Ganho 40% não compensa risco
- 1 perda anula 2.5 ganhos

**Código:**
```python
SE simples = True
   E odds < 1.40
ENTÃO: DESCARTE ("VETO 3: Odd baixa sem valor")
```

---

## ⚠️ VETOS CONDICIONAIS (Use Julgamento)

### 🟡 VETO CONDICIONAL 1: Lesão Jogador Chave

**Quando:**
- Artilheiro suspenso/lesionado
- Goleiro titular fora
- Técnico suspenso

**Impacto:**
- Artilheiro: **-15% confiança**
- Goleiro: **-12% confiança**
- Técnico: **-8% confiança**

---

### 🟡 VETO CONDICIONAL 2: Clima Desfavorável

**Quando:**
- Chuva forte
- Temperatura extrema (< 5°C ou > 35°C)
- Altitude > 2.500m

**Impacto:**
- Chuva: **-10% confiança**
- Temperatura: **-5% confiança**

---

### 🟡 VETO CONDICIONAL 3: Dúvida sobre Jogo

**Quando:**
- Possível adiamento
- Mudança de estádio
- Problemas segurança

**Ação:** DESCARTE até 24h antes

---

## 📋 FLUXO DE APLICAÇÃO

```
Listar jogos
    ↓
VETO 1 (Over/Under?) → Descartar se SIM
    ↓
VETO 2 (PL ambígua?) → Descartar se SIM
    ↓
VETO 3 (Odd baixa?) → Descartar se SIM
    ↓
VETOs CONDICIONAIS → Ajustar confiança
    ↓
RESULTADO:
├─ DESCARTADOS (com razão)
└─ APTOS (continua análise)
```

---

## ✅ CHECKLIST

Antes de recomendar:
- [ ] VETO 1 aplicado
- [ ] VETO 2 aplicado
- [ ] VETO 3 aplicado
- [ ] Lesões verificadas
- [ ] Clima verificado
- [ ] Todos vetos documentados

---

**"A disciplina é escolher entre o que você quer agora e o que você quer mais."** - Jordan Peterson
