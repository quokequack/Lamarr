## 1.1 Funcionais

“São as **funcionalidades** que o sistema deve ter — o que ele deve **fazer**.”

Por ordem de importância, o sistema deverá:

1. Construir trilhas de aprendizado com base nos dados fornecidos pelo usuário
2. Armazenar essas trilhas em banco
3. Salvar informações de cadastro do usuário, a fim de armazenar suas trilhas
4. Permitir o login do usuário
5. Disponibilizar um histórico de trilhas do usuário
6. Disponibilizar o download em pdf das trilhas
7. Permitir que o usuário delete suas trilhas
8. Permitir feedback do usuário sobre a trilha recebida
9. Recomendar ajustes na trilha com base no feedback
10. Enviar a trilha por email
11. Permitir edição de uma trilha existente
12. Incluir links e materiais sugeridos (como livros, vídeos, arquivos, podcasts)
13. Gerar trilhas com níveis escalonados (iniciante, intermediário, avançado)
14. Dashboard para o usuário ver suas trilhas

## 1.2 Conteúdo

O sistema deverá ter dois formulários, que peça ao usuário:

1. **O primeiro formulário**
    1. Nome
    2. Email
    3. O que aprender
    4. Em quanto tempo aprender
    5. Qual o nível no assunto
        1. "Nunca tive contato”
        2. "Já vi algo, mas não sei muito”
        3. “Tenho noção, mas sou iniciante”
        4. "Já estudo com frequência”
    6. Horas diárias a serem dedicadas
    7. Quais recursos disponíveis 
        1. Livros
        2. Celular
        3. Computador
        4. Tablet
        5. Outros
    8. Preferência de trilha
        1. Prática
        2. Teórica
        3. Equilibrada
    9. Houve tentativas anteriores de aprendizado?
    10. Sugestões pagas ou gratuitas?
    11. Objetivo esperado
        1. Iniciante
        2. Aprofundar-se
        3. Especializar-se
        4. Saber mais por diversão
        5. Não sei ainda
    
2. **O segundo formulário**
    1. Como o usuário organiza ideias
        1. Com anotações simples
        2. Com mapas mentais
        3. Flashcards
        4. Com softwares de organização (notion, obsidian, notepad)
        5. Listas
        6. Outros
    2. Escuta músicas ao estudar?
        1. Se sim, que tipo de músicas?
    3. Melhor método de aprendizado
        1. Lendo
        2. Ouvindo
        3. Assistindo alguém fazer
        4. Fazendo
        5. Escrevendo
        6. Outros
    4. Melhor horário para estudar
        1. Manhã
        2. Tarde
        3. Noite
        4. Madrugada
    5. Tipo de projeto em que gosta de trabalhar (para entender que tipo de pessoa é)
        
        i. Lógica e análise de dados (estatística, gráficos e etc)
        
        ii. Criatividade, pensar fora da caixa
        
        iii. Ação rápida e resultados práticos (Quizzes, competições)
        
        iv. Outros
        
3. **Cadastro no sistema**
    1. Email
    2. Senha
    3. Confirmação de senha
    4. Captcha
4. **Login no sistema**
    1. Email 
    2. Senha
    3. Captcha

## 1.3 Não funcionais

“São os **atributos de qualidade**, restrições e critérios que **não descrevem funcionalidades diretas**, mas influenciam o **comportamento e a performance** do sistema.”

Sem ordem de prioridade ou importância:

- Acessibilidade:
    - Compatível com leitores de tela e navegação por teclado
    - Contraste e tamanho de fonte adequados
- **Desempenho:**
    - A tela inicial deve carregar em menos de 2 segundos
    - A geração de trilhas deve ocorrer com tempo de resposta aceitável (<5 segundos)
- **Segurança:**
    - A aplicação deve seguir a LGPD
    - Autenticação e autorização seguras (ex: JWT, OAuth ou o serviço de autenticação do Fireb)
    - Armazenamento seguro de senhas (ex: hash + salt)
- **Usabilidade:**
    - O sistema deve estar disponível 24h por dia
    - Interface responsiva, clara e amigável
    - Feedback visual claro
    - A API do ChatGPT deve estar sendo monitorada
- **Manutenibilidade**:
    - Código limpo e modular
    - Refatoração constante
    - Usar SOLID
    - Firebase Authentication, Firestore e Cloud Functions para autenticação, persistência e chamadas de IA no backend
- **Portabilidade:**
    - Funcionar em todos os navegadores (Chrome, Firefox, Safari, Opera, Edge)
- **Escalabilidade:**
    - O sistema deve ser preparado para receber mais usuários conforme cresce
    - Arquitetura preparada para aumento gradual de usuários e requisições
    - Possibilidade de cache e otimizações futuras (ex: CDN, indexação, lazy loading)
- **Internacionalização:**
    - Considerar estrutura para outros idiomas no futuro (mesmo que agora só use português)
    - Estrutura do front-end e dos prompts da API preparada para múltiplos idiomas (i18n)

## Decisão de arquitetura

O backend escolhido para a primeira versão persistente é Firebase (Authentication, Firestore, Cloud Functions e Hosting). A referência a MongoDB no backlog #10 fica substituída por esta decisão; qualquer retorno ao MongoDB exige uma nova decisão arquitetural antes da implementação da persistência. Consulte `docs/arquitetura.md`.
