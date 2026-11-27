# Arquitetura do Lamarr

## Decisão de backend

Para a primeira versão persistente, o Lamarr usará Firebase:

- Firebase Authentication para identidade e sessão;
- Firestore para perfis, questionários e trilhas;
- Cloud Functions para chamar provedores de IA sem expor chaves no navegador;
- Firebase Hosting para a aplicação web.

Essa decisão resolve a divergência com o backlog que menciona MongoDB (#10). A integração MongoDB fica substituída por esta decisão e só deve voltar ao backlog mediante uma nova decisão arquitetural registrada. O frontend desta etapa não inicializa SDK de persistência: ele expõe contratos e stores Pinia para que o adapter de backend seja conectado quando os requisitos de persistência forem implementados.

## Módulos do frontend

```text
src/
├── domain/       contratos compartilhados de objetivos, preferências e trilhas
├── stores/       estado de questionário, sessão e trilhas com Pinia
├── router/       rotas públicas e rotas autenticadas
├── components/   layout e composição da experiência pública
├── views/        páginas públicas e área autenticada
└── config/       somente configuração pública do build
```

O fluxo de dependências é `views/components → stores → domain`. A autenticação e a persistência serão adapters na borda da aplicação; nenhum segredo de IA pertence a `src/` ou a uma variável `VITE_*`.

## Estados de geração

Uma geração de trilha pode estar `idle`, `generating`, `ready` ou `error`. O store de trilhas guarda o estado da operação separado das trilhas prontas, permitindo que a UI mostre progresso e erro sem misturar estado transitório com dados persistidos.
