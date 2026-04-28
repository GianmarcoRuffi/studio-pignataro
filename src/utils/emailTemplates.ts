interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export function linkifyMessage(text: string): string {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  
  return text
    .replace(urlPattern, '<a href="$1" style="color: #0066cc; text-decoration: underline;">$1</a>')
    .replace(emailPattern, '<a href="mailto:$1" style="color: #0066cc; text-decoration: underline;">$1</a>');
}

export function generateContactEmailHTML(data: ContactEmailData): string {
  const { name, email, message } = data;
  const messageWithLinks = linkifyMessage(message);
  
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: #373737;
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
      }
      .subtitle {
        margin: 5px 0 0 0;
        opacity: 0.9;
        font-size: 0.95em;
      }
      .content {
        background: #f7f7f7;
        padding: 30px;
        border-radius: 0 0 8px 8px;
      }
      .sender-info {
        background: white;
        padding: 20px;
        margin: 0 0 20px 0;
        border-radius: 6px;
        border-left: 4px solid #373737;
      }
      .sender-label {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 8px;
      }
      .sender-details {
        font-size: 1.1em;
        font-weight: 600;
        color: #373737;
      }
      .sender-email {
        margin-top: 5px;
        font-size: 0.95em;
      }
      .sender-email a {
        color: #0066cc;
        text-decoration: none;
      }
      .message-box {
        background: white;
        padding: 20px;
        margin: 20px 0;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      }
      .message-label {
        font-weight: bold;
        color: #373737;
        margin-bottom: 12px;
        font-size: 0.95em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .message-content {
        background: #fafafa;
        padding: 20px;
        border-radius: 6px;
        border-left: 3px solid #373737;
        white-space: pre-wrap;
        word-wrap: break-word;
        line-height: 1.8;
      }
      .message-content a {
        color: #0066cc;
        text-decoration: underline;
        word-break: break-all;
      }
      .footer-note {
        margin-top: 25px;
        padding: 15px;
        background: white;
        border-radius: 6px;
        font-size: 0.9em;
        color: #666;
        border-top: 2px solid #373737;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h2 style="margin: 0;">Nuovo messaggio dal form di contatto</h2>
      <p class="subtitle">Studio Dott. Arch. Gianluca Pignataro</p>
    </div>
    <div class="content">
      <div class="sender-info">
        <div class="sender-label">Ricevuto da:</div>
        <div class="sender-details">${name}</div>
        <div class="sender-email">
          <a href="mailto:${email}">${email}</a>
        </div>
      </div>
      
      <div class="message-box">
        <div class="message-label">Messaggio:</div>
        <div class="message-content">${messageWithLinks.replace(/\n/g, "<br>")}</div>
      </div>
      
      <div class="footer-note">
        <strong>Suggerimento:</strong> Puoi rispondere direttamente a questa email per contattare ${name}. 
        Il messaggio originale verrà automaticamente citato nella tua risposta.
      </div>
    </div>
  </body>
</html>
  `.trim();
}

export function generateContactEmailText(data: ContactEmailData): string {
  const { name, email, message } = data;
  
  return `
NUOVO MESSAGGIO DAL FORM DI CONTATTO
Studio Dott. Arch. Gianluca Pignataro

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RICEVUTO DA:
${name}
${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGGIO:

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Puoi rispondere direttamente a questa email per contattare ${name}.
  `.trim();
}

export const EMAIL_SUBJECT = 'Nuovo messaggio dal form del tuo sito "Studio Dott. Arch. Gianluca Pignataro"';
