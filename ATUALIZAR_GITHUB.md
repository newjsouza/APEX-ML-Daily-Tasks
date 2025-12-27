# Guia de Atualização APEX - Dados XG Acumulado

## Visão Geral

Este documento descreve como atualizar os 3 arquivos principais do APEX com novos dados de análise esportiva:

1. **DADOS_XG_UNDERSTAT_27_12_2025.json** - Dados estruturados
2. **APEX_27_12_2025_COM_XG_ACUMULADO.html** - Relatório visual
3. **ATUALIZAR_GITHUB.md** - Este arquivo (instruções)

---

## Estrutura dos Arquivos

### 1. JSON - Dados Brutos

Arquivo: `DADOSXGUNDERSTAT27122025.json`

Estrutura principal:
```json
{
  "datacoleta": "YYYY-MM-DDTHH:MM:SSZ",
  "versao": "1.0.0",
  "competicoes": [...],
  "jogos": [...],
  "metricasagregadas": {...},
  "tendencias": [...],
  "alertas": [...]
}
```

---

### 2. HTML - Visualização

Arquivo: `APEX27122025COMXGACUMULADO.html`

Relatório visual interativo com:
- Header com metadata
- Cards de métricas gerais
- Seção para cada jogo
- Tabelas de comparação entre times
- Alertas e tendências
- Footer com informações

---

### 3. README - Instruções

Este arquivo!

---

## Como Atualizar os Dados

### Passo 1: Renomear Arquivos com Nova Data

Quando adicionar dados novos (ex: 28 de dezembro):

```bash
# Exemplo para 28/12/2025
DADOS_XG_UNDERSTAT_28_12_2025.json
APEX_28_12_2025_COM_XG_ACUMULADO.html
Formato de data: DDMMYYYY (sem barras)

Passo 2: Estrutura JSON - Competições
Adicione as competições que serão analisadas:

```

```json
"competicoes": [
{
"id": "BR1",
"nome": "Campeonato Brasileiro - Série A",
"rodada": 34,
"pais": "Brasil"
},
{
"id": "CL1",
"nome": "UEFA Champions League",
"fase": "Fase de Grupos",
"pais": "Europa"
}
]
```

Campos obrigatórios:

id - Identificador único (ex: BR1, CL1, PL1)

nome - Nome completo da competição

rodada ou fase - Momento da competição

pais - País/região

Passo 3: Estrutura JSON - Jogos
Adicione cada jogo analisado:

```

```json
{
"id": "BR134001",
"data": "2025-12-27",
"horario": "19:00",
"competicao": "BR1",
"rodada": 34,
"timecasa": {
"nome": "Botafogo",
"abreviacao": "BOT",
"posicaotabela": 2,
"id": "BOT001"
},
"timevisitante": {
"nome": "Palmeiras",
"abreviacao": "PAL",
"posicaotabela": 1,
"id": "PAL001"
},
"placarfinal": {
"casa": 1,
"visitante": 2,
"status": "finalizado"
},
"xgacumulado": {
"casa": 1.85,
"visitante": 2.43,
"diferenca": -0.58
},
"estatisticas": {
"casa": {
"possebola": 45.2,
"passescertos": 312,
"passestotal": 426,
"chutes": 12,
"chutesnoalvo": 4,
"escanteios": 6,
"faltas": 14,
"cartoesamarelos": 2,
"cartoesvermelhos": 0,
"desarmes": 28,
"interceptacoes": 15
},
"visitante": {...}
},
"momentoscriticos": [
{
"minuto": 23,
"tipo": "gol",
"time": "visitante",
"jogador": "Estvo",
"xg": 0.68,
"tipojogada": "cruzamento"
}
]
}
```

Campos obrigatórios:

Informações básicas: id, data, horario, competicao

Times: timecasa e timevisitante com nome, abreviação, posição

Resultado: placarfinal (casa, visitante, status)

Análise: xgacumulado (valores XG de ambos os times)

Estatísticas: estatisticas (posse, passes, chutes, etc)

Momentos: momentoscriticos (gols e eventos importantes)

Passo 4: Estrutura JSON - Métricas Agregadas
Calcule totais e médias de todos os jogos:

```

```json
"metricasagregadas": {
"totaljogosanalisados": 3,
"totalgols": 9,
"xgtotal": 10.98,
"eficienciageral": 0.82,
"taxaconversaomedia": 0.34,
"desvioxgvsgols": 1.78
}
```
