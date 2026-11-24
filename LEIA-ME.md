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

## Publicar na Vercel

O projeto já está configurado (`vercel.json`): a Vercel publica a pasta `site` e não precisa de build.

1. Entre em https://vercel.com com a sua conta do GitHub.
2. **Add New… > Project**, escolha o repositório **site-sandro** e clique em **Import**.
3. Em **Framework Preset**, deixe **Other**. Não mude mais nada e clique em **Deploy**.
4. Depois disso, cada envio para o GitHub (branch `main`) atualiza o site sozinho.

### E-mail do pré-diagnóstico na Vercel

No Netlify, os pedidos chegavam por e-mail pelo Netlify Forms, que não existe na Vercel. Na Vercel, quem envia o e-mail é a função `api/pre-diagnostico.js`, usando o serviço Resend (tem plano grátis):

1. Crie uma conta em https://resend.com com o e-mail **sanaythleti@gmail.com** e gere uma **API Key**.
2. Na Vercel, abra o projeto > **Settings > Environment Variables** e adicione `RESEND_API_KEY` com essa chave.
3. Faça um novo deploy (**Deployments > ... > Redeploy**).

Sem essa chave o site funciona normalmente e o cliente é levado ao WhatsApp com a mensagem pronta, mas o e-mail de aviso não é enviado. Opcional: `FORM_TO` muda o e-mail que recebe os pedidos e `FORM_FROM` muda o remetente (no plano grátis do Resend, sem domínio próprio, o e-mail só pode ir para o dono da conta).

Depois de publicar, troque o endereço `sanaythle-informatica.netlify.app` pelo novo endereço da Vercel em `site/index.html` (linhas `canonical` e `og:`), `site/robots.txt` e `site/sitemap.xml`.

## Publicar no Netlify (continua funcionando)

No painel do Netlify, abra o site **sanaythle-informatica**, vá em **Deploys** e arraste a pasta `site` para a área de upload. Lá, os pedidos do pré-diagnóstico continuam chegando pelo Netlify Forms.

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
