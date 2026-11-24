# Site Sanaythle Informática

## Pastas

- `site/`: versão nova do site. Esta é a pasta que vai para o Netlify.
- `original/`: cópia do site publicado antes da mudança (24/11/2026), guardada como backup.
- `servidor-local.ps1`: abre o site no seu computador para testar.

## Ver o site no computador

1. Clique com o botão direito em `servidor-local.ps1` e escolha **Executar com o PowerShell**.
2. Abra http://localhost:8080 no navegador.
3. Para parar, feche a janela do PowerShell.

Abrir o `index.html` com dois cliques também funciona, mas o envio do pré-diagnóstico só funciona no site publicado.

## Publicar no Netlify

No painel do Netlify, abra o site **sanaythle-informatica**, vá em **Deploys** e arraste a pasta `site` para a área de upload.

O formulário do pré-diagnóstico (`pre-diagnostico`) e a página `ficha.html` continuam iguais, então os e-mails de aviso do Netlify Forms seguem chegando.

## O que mudou

- Botões de WhatsApp em verde, com o ícone do WhatsApp, em todos os pontos de contato.
- Topo do site com dois caminhos claros: pedir orçamento no WhatsApp ou fazer o pré-diagnóstico grátis.
- Faixa de garantias com ícones logo abaixo do topo.
- Serviços com filtro (Todos / Computadores / Impressoras) e cards com o pedido de orçamento já com o nome do serviço na mensagem.
- Cartão "Não achou o seu problema?" no fim dos serviços.
- Aviso de "Aberto agora / Fechado, abre..." no topo, na etiqueta e no contato, pelo horário de Belém.
- Suporte para empresas com ícones e mais destaque.
- Dúvidas frequentes: de 5 para 9 perguntas, abrindo uma de cada vez.
- Chamada final antes do contato.
- Contato com botões "Copiar" (WhatsApp e e-mail) e "Como chegar" (Google Maps).
- Botão flutuante "Fale com um técnico" no computador e barra fixa no celular.
- Animações suaves ao rolar, desligadas para quem prefere menos movimento.
- SEO: perguntas frequentes marcadas para o Google, `robots.txt`, `sitemap.xml` e `site.webmanifest`.
