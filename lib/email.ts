import { Resend } from "resend";
import type { Message } from "@/lib/db/schema/messages";
import type { Quote, QuoteItem } from "@/lib/db/schema/quotes";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "promosportsdakar@yahoo.fr";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "noreply@dakarsport.sn";

function formatCFA(amount: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);
}

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dakar Sport</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#1E40AF;padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background:#ffffff;color:#1E40AF;font-weight:900;font-size:16px;padding:6px 12px;border-radius:6px;">DS</span>
                    <span style="color:#ffffff;font-weight:700;font-size:18px;margin-left:12px;">Dakar Sport</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#f1f5f9;padding:16px 32px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                Dakar Sport — Avenue G. Pompidou, Dakar, Sénégal<br>
                <a href="mailto:promosportsdakar@yahoo.fr" style="color:#1E40AF;">promosportsdakar@yahoo.fr</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactNotification(message: Pick<Message, "name" | "email" | "phone" | "subject" | "body">): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const content = `
    <h2 style="margin:0 0 16px;color:#1e293b;font-size:20px;">Nouveau message de contact</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
      <tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;width:140px;">Nom</td>
        <td style="padding:10px 16px;color:#1e293b;">${message.name}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Email</td>
        <td style="padding:10px 16px;"><a href="mailto:${message.email}" style="color:#1E40AF;">${message.email}</a></td>
      </tr>
      ${message.phone ? `<tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Téléphone</td>
        <td style="padding:10px 16px;color:#1e293b;">${message.phone}</td>
      </tr>` : ""}
      <tr ${message.phone ? "" : `style="background:#f8fafc;"`}>
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Sujet</td>
        <td style="padding:10px 16px;color:#1e293b;">${message.subject}</td>
      </tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:4px solid #1E40AF;border-radius:0 6px 6px 0;">
      <p style="margin:0;color:#1e293b;line-height:1.6;">${message.body.replace(/\n/g, "<br>")}</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[Contact] ${message.subject} — ${message.name}`,
    html: baseTemplate(content),
  });
}

export async function sendQuoteNotification(quote: Pick<Quote, "clubName" | "contactName" | "email" | "phone" | "items" | "totalPrice">): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const items = quote.items as QuoteItem[];
  const itemsRows = items.map((item, i) => `
    <tr ${i % 2 === 0 ? 'style="background:#f8fafc;"' : ""}>
      <td style="padding:10px 16px;color:#1e293b;">${item.productName}</td>
      <td style="padding:10px 16px;color:#1e293b;text-align:center;">${item.quantity}</td>
      <td style="padding:10px 16px;color:#1e293b;text-align:right;">${formatCFA(item.unitPrice)}</td>
      <td style="padding:10px 16px;font-weight:600;color:#1e293b;text-align:right;">${formatCFA(item.unitPrice * item.quantity)}</td>
    </tr>
  `).join("");

  const content = `
    <h2 style="margin:0 0 16px;color:#1e293b;font-size:20px;">Nouvelle demande de devis club</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;margin-bottom:20px;">
      <tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;width:160px;">Club</td>
        <td style="padding:10px 16px;color:#1e293b;font-weight:600;">${quote.clubName}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Contact</td>
        <td style="padding:10px 16px;color:#1e293b;">${quote.contactName}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Email</td>
        <td style="padding:10px 16px;"><a href="mailto:${quote.email}" style="color:#1E40AF;">${quote.email}</a></td>
      </tr>
      ${quote.phone ? `<tr><td style="padding:10px 16px;font-weight:600;color:#64748b;">Téléphone</td><td style="padding:10px 16px;color:#1e293b;">${quote.phone}</td></tr>` : ""}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
      <tr style="background:#1E40AF;">
        <th style="padding:10px 16px;color:#fff;text-align:left;font-size:13px;">Article</th>
        <th style="padding:10px 16px;color:#fff;text-align:center;font-size:13px;">Qté</th>
        <th style="padding:10px 16px;color:#fff;text-align:right;font-size:13px;">Prix unit.</th>
        <th style="padding:10px 16px;color:#fff;text-align:right;font-size:13px;">Sous-total</th>
      </tr>
      ${itemsRows}
      <tr style="border-top:2px solid #e2e8f0;">
        <td colspan="3" style="padding:12px 16px;font-weight:700;color:#1e293b;text-align:right;">TOTAL</td>
        <td style="padding:12px 16px;font-weight:700;color:#DC2626;font-size:16px;text-align:right;">${formatCFA(quote.totalPrice)}</td>
      </tr>
    </table>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[Devis] ${quote.clubName} — ${formatCFA(quote.totalPrice)}`,
    html: baseTemplate(content),
  });
}

export async function sendLeadNotification(lead: { name: string; phone: string; productName: string; productUrl: string }): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const content = `
    <h2 style="margin:0 0 16px;color:#1e293b;font-size:20px;">Nouveau lead WhatsApp</h2>
    <p style="color:#64748b;margin:0 0 20px;">Un client a cliqué sur le bouton WhatsApp pour ce produit.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
      <tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;width:140px;">Produit</td>
        <td style="padding:10px 16px;"><a href="${lead.productUrl}" style="color:#1E40AF;">${lead.productName}</a></td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Nom</td>
        <td style="padding:10px 16px;color:#1e293b;">${lead.name}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:10px 16px;font-weight:600;color:#64748b;">Téléphone</td>
        <td style="padding:10px 16px;"><a href="https://wa.me/${lead.phone}" style="color:#25D366;font-weight:600;">WhatsApp: ${lead.phone}</a></td>
      </tr>
    </table>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[Lead WhatsApp] ${lead.name} — ${lead.productName}`,
    html: baseTemplate(content),
  });
}
