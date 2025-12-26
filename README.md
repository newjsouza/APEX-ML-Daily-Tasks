# 🎯 APEX-ML: Análise Automática de Apostas Esportivas

Sistema inteligente de análise e recomendação de apostas esportivas usando IA.
Gera relatórios diários em HTML com confiança > 70%.

**Última Análise:** 27/12/2025  
**Taxa de Acerto:** 74.4% confiança média  
**EV Esperado:** +14.2%

[Ver Último Relatório](./reports/2025-12-27-relatorio.html)

## 🚀 Quick Start

```bash
# Clonar repositório
git clone https://github.com/newjsouza/APEX-ML-Daily-Tasks.git
cd APEX-ML-Daily-Tasks

# Instalar dependências
npm install

# Configurar API keys (copiar exemplo)
cp config/api-keys.example.env config/api-keys.env
# Editar config/api-keys.env com suas chaves

# Executar análise
npm run analyze

# Gerar relatório HTML
npm run generate-report
```

## 📁 Estrutura do Projeto

```
APEX-ML-Daily-Tasks/
├── config/          # Configurações de API e ligas
├── src/             # Código-fonte principal
│   ├── analyzer/    # Engine de análise APEX
│   ├── generators/  # Geradores de relatórios
│   └── utils/       # Utilitários
├── data/            # Dados históricos e estatísticas
├── reports/         # Relatórios HTML gerados
├── tests/           # Testes automatizados
├── scripts/         # Scripts de automação
└── docs/            # Documentação técnica
```

## 🎯 Metodologia APEX

### Princípios de Análise

1. **Sem pensamento binário** - Analisa 3+ fatores por jogo
2. **EV adaptativo** - Ajusta confiança por contexto
3. **Risco inteligente** - Stakes variam por confiança
4. **Correlação mapeada** - Identifica interdependências

### Critérios de Veto Automático

- Over 2.5 isolado (taxa histórica 25%)
- Equilíbrio total (xG diferença 0.0)
- Ambas eliminadas (AFCON)
- Dados incertos (validação SofaScore)

### Confiança > 70% = APTO

Apenas recomendações com confiança acima de 70% são incluídas nos relatórios.

## 📊 Ligas Suportadas

- ⚽ **Premier League** (Inglaterra)
- 🏆 **AFCON** (Copa Africana de Nações)
- 🇪🇸 **La Liga** (Espanha)
- 🇩🇪 **Bundesliga** (Alemanha)
- 🇮🇹 **Serie A** (Itália)

## 🔧 Scripts Disponíveis

```bash
npm run analyze           # Executa análise completa
npm run generate-report   # Gera relatório HTML
npm run fetch-data        # Busca dados ao vivo
npm run test              # Executa testes
npm run deploy            # Deploy de relatórios
```

## 📈 Resultados Históricos

| Período | Jogos | Acertos | Taxa | EV Médio |
|---------|-------|---------|------|----------|
| Dez/25  | 27    | 20      | 74.4%| +14.2%   |
| Nov/25  | 35    | 24      | 68.6%| +11.8%   |
| Out/25  | 42    | 28      | 66.7%| +9.5%    |

## 🤖 Automação

O sistema executa análises diárias automaticamente via GitHub Actions às 08:00 UTC.

Veja [.github/workflows/daily-analysis.yml](.github/workflows/daily-analysis.yml) para detalhes.

## 📚 Documentação

- [Setup Completo](./docs/SETUP.md)
- [Integração com APIs](./docs/API-INTEGRATION.md)
- [Metodologia APEX](./docs/APEX-METHODOLOGY.md)
- [Changelog](./docs/CHANGELOG.md)

## 🔐 Segurança

- Nunca commite API keys no repositório
- Use `config/api-keys.example.env` como template
- Mantenha suas keys em `config/api-keys.env` (gitignored)

## 📝 License

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

---

**Desenvolvido com ❤️ por Johnathan Souza**  
**Powered by APEX-ML Engine v2.0**