<div align="center">
  <img src="./public/imgs/hedy.png" alt="Ilustração do Lamarr" />
</div>

# Lamarr

Trilhas de aprendizado personalizadas para quem quer aprender com o tempo que tem.

O Lamarr transforma um objetivo de estudo em uma sequência de módulos, atividades e materiais. A primeira experiência coleta o que a pessoa quer aprender, seu nível, sua rotina e suas preferências; a trilha é gerada e pode ser acompanhada ao longo do tempo.

## Base técnica

- Vue 3, TypeScript, Vite e Vue Router;
- Vuetify com tema baseado na identidade visual existente;
- Pinia para questionário, sessão e trilhas;
- Vitest e Playwright para testes;
- ESLint, Prettier e CI via GitHub Actions.

O backend definido para a primeira versão persistente é Firebase: Authentication, Firestore, Cloud Functions e Hosting. A decisão e os limites do frontend estão documentados em [`docs/arquitetura.md`](docs/arquitetura.md). MongoDB (#10) não deve ser implementado sem uma nova decisão arquitetural.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Para validar uma mudança, use `scripts/quality.sh` ou os comandos descritos em [`docs/configuracao-local.md`](docs/configuracao-local.md).

## Segurança de configuração

O frontend aceita apenas configuração pública com prefixo `VITE_`. Nenhuma chave privada de IA, token de backend ou credencial de banco pode ser incluída no bundle. Chamadas a provedores de IA deverão passar por Cloud Functions.

## Documentação do produto

Requisitos, personas, jornadas, casos de uso e histórias estão em [`docs/modelagens`](docs/modelagens). Os contratos TypeScript compartilhados ficam em [`src/domain/learning.ts`](src/domain/learning.ts).
