# 🚀 Quick Start - APEX Monitor

Guia rápido para começar com o APEX Monitor.

## Requisitos

- Node.js 14+ 
- npm ou yarn
- Git

## Instalação em 5 Minutos

### 1. Clone o repositório

```
git clone https://github.com/newjsouza/APEX-ML-Daily-Tasks.git
cd APEX-ML-Daily-Tasks
```

### 2. Instale as dependências

```
cd monitor/backend
npm install
```

### 3. Configure as variáveis de ambiente

```
cp .env.example .env
# Edite .env conforme necessário
```

### 4. Inicie o servidor

```
npm run dev
```

### 5. Acesse o monitor

Abra seu navegador e acesse:
```
http://localhost:3000
```

## Estrutura de Pastas

- `monitor/backend/` - API Node.js/Express
- `monitor/public/` - Interface web
- `dados-analises/` - Dados de análises
- `config/` - Configurações do projeto

## Comandos Úteis

```
# Iniciar em desenvolvimento (com auto-reload)
npm run dev

# Iniciar em produção
npm start

# Executar testes
npm test
```

## Próximos Passos

1. Leia [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para resolver problemas
2. Configure suas análises em `dados-analises/`
3. Customize a interface em `monitor/public/index.html`

## Suporte

Para mais informações, consulte o [README.md](README.md) principal.
