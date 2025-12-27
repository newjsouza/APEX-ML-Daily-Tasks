# 🔧 Troubleshooting - Resolução de Problemas

Soluções para problemas comuns no APEX Monitor.

## Porta 3000 já está em uso

### Solução 1: Use outra porta

```
PORT=3001 npm run dev
```

### Solução 2: Libere a porta 3000

**Windows:**
```
powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```
lsof -i :3000
kill -9 <PID>
```

## Erro: Cannot find module 'express'

Execute:
```
npm install
```

## Erro: .env não encontrado

```
cp .env.example .env
```

## Servidor não inicia

1. Verifique o Node.js: `node --version`
2. Limpe cache: `rm -rf node_modules && npm install`
3. Verifique erros no console
4. Reinicie o VS Code

## Dados não carregam no dashboard

1. Verifique se o servidor está rodando
2. Abra o console do navegador (F12)
3. Procure por erros de CORS
4. Verifique a conexão com /api/monitor

## Performance lenta

1. Reduza a frequência de atualização em index.html
2. Verifique o uso de RAM: `npm list`
3. Aumente a memória do Node: `NODE_OPTIONS=--max_old_space_size=4096`

## Mais Ajuda

Consulte [README.md](README.md) ou abra uma issue no GitHub.
