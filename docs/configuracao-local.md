# Configuração local

## Requisitos

- Node.js 20 ou superior;
- npm com o `package-lock.json` versionado.

## Instalação e execução

```bash
npm ci
npm run dev
```

Verificações disponíveis:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:e2e
```

O gate unificado é `scripts/quality.sh`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` quando precisar alterar o nome público da aplicação. Variáveis com prefixo `VITE_` são incorporadas ao bundle e, portanto, devem conter apenas valores públicos.

Chaves de Firebase, tokens de provedores de IA e credenciais de banco devem ficar somente no backend/Cloud Functions. Não coloque esses valores em `.env.local` do frontend, no repositório ou em componentes Vue.
