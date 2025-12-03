# DeuFila-
📌 Sobre o Projeto

Deu Fila é um aplicativo web focado em bares e restaurantes, permitindo ao usuário:

visualizar estabelecimentos próximos,

acompanhar o status de fila (vazio, moderado ou lotado),

acessar perfis individuais dos locais,

ver promoções, horários e avaliações,

fazer reservas,

navegar por mapa,

e interagir em uma interface moderna, inspirada em aplicativos reais.

O projeto foi desenvolvido inteiramente em HTML, CSS, JavaScript e React, sem back-end.
Todos os dados são carregados diretamente pelo front-end.

🎯 Objetivo da Aplicação

O objetivo é oferecer uma plataforma simples e rápida onde o usuário possa:

descobrir novos bares e restaurantes,

evitar filas desnecessárias,

conferir informações essenciais antes de sair de casa,

e registrar avaliações e comentários após a visita.

Da perspectiva de aprendizado, o projeto reforça:

uso de React sem build complexo,

navegação entre telas dentro de um SPA,

uso de estados, renderização condicional e componentes,

controle de eventos, modais e listas,

manipulação do DOM e JavaScript puro para páginas auxiliares.

🚀 Funcionalidades Principais
✔ Tela de Login

Tela inicial do sistema, permite acessar o catálogo.

✔ Página de Criar Conta

Formulário simples de registro (somente frontend).

✔ Catálogo de Estabelecimentos (React)

Exibe todos os bares e restaurantes cadastrados com:

foto

nota

categoria

status de fila

promoções

filtros e busca

navegação entre telas

✔ Perfil Individual do Estabelecimento

Ao clicar em um card, o usuário acessa uma página com:

imagem principal

descrição

horário

preço

endereço

telefone

promoções

avaliações reais armazenadas em estado (React)

✔ Sistema de Avaliações

O usuário pode avaliar com estrelas e escrever comentários.

✔ Sistema de Reservas

Gerado dinamicamente em reservas.js, com horários disponíveis e opção de cancelar.

✔ Mapa Integrado

Página com um mapa mostrando a região dos estabelecimentos.

✔ Menu Inferior (Navegação)

Disponível em todas as telas principais:

Início

Mapa

Perfil

🛠 Tecnologias Utilizadas

HTML5

CSS3

JavaScript

React (via CDN)

VSCode + Live Server

📂 Estrutura Simplificada do Projeto
/DeuFila
│
├── index.html          # Tela de Login
├── login.html          # Criar Conta
├── catalogo.html       # Entrada do App React
├── mapa.html           # Mapa da cidade
├── reservas.html       # Sistema de reservas
│
├── app.js              # Lógica principal do React
├── main.js             # Lógica dos formulários HTML
├── reservas.js         # Lógica do sistema de reserva
│
├── caio.css            # Estilos gerais da aplicação
└── imgs/               # Imagens dos estabelecimentos

▶️ Como Executar o Projeto

O projeto não precisa de Node, npm, servidor externo ou instalação de pacotes.
Basta rodar localmente usando qualquer extensão de servidor estático.

✔ Método recomendado: Live Server no VS Code

Abra o projeto no VSCode.

Clique com o botão direito em index.html (a tela de login).

Escolha Open with Live Server ou Go Live no canto inferior direito.

O navegador abrirá automaticamente em:

http://127.0.0.1:5500/index.html

✔ Importante:

Sempre abra o sistema começando pelo index.html.

Se abrir outro arquivo diretamente, os links podem quebrar.

Todas as telas funcionam porque estão na mesma pasta.

👥 Autores
Ruan Montenegro

Desenvolvimento do React

Criação das telas dinâmicas (catálogo, perfis, perfil do usuário)

Sistema de avaliações

Navegação interna entre telas

Caio Roberto

Estilização geral (CSS)

Design do catálogo, cards e responsividade

Ajustes visuais das páginas e componentes

Juan Wagner

Criador das páginas HTML iniciais

Implementação da lógica de login, cadastro e reservas

Estruturação das páginas auxiliares (mapa, reservas, validações)

📄 Licença

Projeto desenvolvido para fins educacionais.
