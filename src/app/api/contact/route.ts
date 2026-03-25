import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting semplice in-memory (per production usare Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 3; // max 3 richieste per minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Sanitizzazione HTML per prevenire XSS nelle email
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validazione lunghezza
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Troppe richieste. Riprova tra un minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, name, message, acceptPrivacy, honeypot } = body;

    // Honeypot check - se compilato è un bot
    if (honeypot) {
      // Rispondi con successo per non far capire al bot che è stato bloccato
      return NextResponse.json(
        { message: "Email inviata con successo" },
        { status: 200 }
      );
    }

    // Validazione base
    if (!email || !name || !message || !acceptPrivacy) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Validazione lunghezza
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Il nome non può superare ${MAX_NAME_LENGTH} caratteri` },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Email non valida" },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Il messaggio non può superare ${MAX_MESSAGE_LENGTH} caratteri` },
        { status: 400 }
      );
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    // Sanitizzazione dati per HTML
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase());
    const sanitizedMessage = sanitizeHtml(message.trim());

    // Log per debugging
    console.log("=== NUOVA EMAIL RICEVUTA ===");
    console.log("Da:", sanitizedEmail);
    console.log("Nome:", sanitizedName);
    console.log("Messaggio:", sanitizedMessage.substring(0, 100) + "...");
    console.log("IP:", ip);
    console.log("============================");

    // Verifica che la chiave API sia configurata
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY non configurata");
      return NextResponse.json(
        { error: "Servizio email non configurato correttamente" },
        { status: 500 }
      );
    }

    // Invio email con Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: process.env.EMAIL_TO || "gianmarco.ruffi@outlook.it",
      subject: `Nuovo messaggio da ${sanitizedName}`,
      replyTo: email.trim().toLowerCase(),
      html: `
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
              .content {
                background: #f7f7f7;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .info-box {
                background: white;
                padding: 15px;
                margin: 15px 0;
                border-radius: 6px;
                border-left: 4px solid #373737;
              }
              .label {
                font-weight: bold;
                color: #373737;
                margin-bottom: 5px;
              }
              .message-content {
                background: white;
                padding: 20px;
                border-radius: 6px;
                margin-top: 15px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">Nuovo messaggio dal form di contatto</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Studio Architetto Pignataro</p>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="label">Nome:</div>
                <div>${sanitizedName}</div>
              </div>
              <div class="info-box">
                <div class="label">Email:</div>
                <div><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
              </div>
              <div class="info-box">
                <div class="label">Messaggio:</div>
                <div class="message-content">${sanitizedMessage.replace(/\n/g, "<br>")}</div>
              </div>
              <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                <em>Puoi rispondere direttamente a questa email per contattare ${sanitizedName}.</em>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Errore Resend:", error);
      return NextResponse.json(
        { error: "Errore nell'invio dell'email" },
        { status: 500 }
      );
    }

    console.log("Email inviata con successo:", data);

    return NextResponse.json(
      { message: "Email inviata con successo", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore nell'API contact:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
