# Questionário de geração

## Etapas

O questionário de uma nova trilha tem três etapas públicas:

1. **Objetivos e disponibilidade:** identifica a pessoa, o assunto, o nível atual, o resultado esperado, os recursos, o prazo, a data de início, os dias por semana e as horas diárias.
2. **Preferências de estudo:** registra organização de ideias, música, métodos, horário e tipos de projeto.
3. **Revisão:** mostra todas as respostas, a data final estimada e a carga total disponível antes da confirmação para geração.

As etapas usam os contratos em `src/domain/learning.ts`. A validação e o mapeamento para `TrailGenerationInput` ficam em `src/domain/questionnaire.ts`, mantendo a futura integração de geração separada da apresentação.

## Disponibilidade

A data final estimada é calculada somando o prazo à data de início. A carga disponível é:

```text
(duração em dias / 7) × dias de estudo por semana × horas por dia
```

O prazo precisa ter pelo menos uma unidade, a data de início não pode estar no passado, os dias precisam estar entre 1 e 7 e as horas entre 0,5 e 12 por dia.

## Rascunho e reinício

As respostas são mantidas no Pinia enquanto a pessoa navega entre as etapas e são espelhadas no `sessionStorage` para sobreviver a uma recarga da aba. Uma nova aba ou uma nova sessão do navegador não é tratada como sincronização de rascunho. O botão **Recomeçar questionário** remove o rascunho e inicia as etapas vazias; alterações posteriores voltam a criar um novo rascunho.
