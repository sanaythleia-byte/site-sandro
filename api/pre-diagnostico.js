// Função da Vercel que recebe o pré-diagnóstico do site e envia por e-mail.
// Substitui o Netlify Forms quando o site está hospedado na Vercel.
//
// Configure em Vercel > Project > Settings > Environment Variables:
//   RESEND_API_KEY  chave da conta Resend (https://resend.com), obrigatória para enviar
//   FORM_TO         e-mail que recebe os pedidos (padrão: sanaythleti@gmail.com)
//   FORM_FROM       remetente (padrão: "Site Sanaythle <onboarding@resend.dev>")
// Sem a RESEND_API_KEY o cliente ainda é levado ao WhatsApp, mas o e-mail não é enviado.

const FIELDS = ['Protocolo', 'Cliente', 'WhatsApp', 'Horario', 'Equipamento', 'Problema', 'Respostas', 'Observacoes', 'Ficha'];

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return Object.fromEntries(new URLSearchParams(req.body));
  return {};
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const data = readBody(req);
  if (data['bot-field']) return res.status(200).json({ ok: true }); // armadilha para robôs

  const d = {};
  for (const k of FIELDS) d[k] = String(data[k] || '').slice(0, 5000);
  if (!d.WhatsApp || d.WhatsApp.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ ok: false, error: 'invalid_phone' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('pre-diagnostico: RESEND_API_KEY não configurada; e-mail não enviado', d.Protocolo);
    return res.status(503).json({ ok: false, error: 'email_not_configured' });
  }

  const ficha = /^https:\/\//.test(d.Ficha) ? d.Ficha : '';
  const rows = FIELDS.filter((k) => k !== 'Ficha' && d[k])
    .map((k) => `<tr><td style="padding:6px 12px 6px 0;color:#566579;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(d[k])}</td></tr>`)
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#13233B">
<h2 style="margin:0 0 12px">Novo pré-diagnóstico pelo site</h2>
<table style="border-collapse:collapse">${rows}</table>
${ficha ? `<p style="margin-top:16px"><a href="${esc(ficha)}">Abrir a ficha de entrada</a></p>` : ''}
</div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FORM_FROM || 'Site Sanaythle <onboarding@resend.dev>',
        to: [process.env.FORM_TO || 'sanaythleti@gmail.com'],
        subject: `Pré-diagnóstico ${d.Protocolo} - ${d.Cliente || 'Cliente'} - ${d.Problema}`.slice(0, 200),
        html,
      }),
    });
    if (!r.ok) {
      console.error('pre-diagnostico: Resend respondeu', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'email_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('pre-diagnostico: erro ao enviar', e);
    return res.status(502).json({ ok: false, error: 'email_failed' });
  }
};
