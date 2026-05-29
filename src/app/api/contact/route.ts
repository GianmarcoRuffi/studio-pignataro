import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import {
  generateContactEmailHTML,
  generateContactEmailText,
  buildContactEmailSubject,
} from "@/utils/emailTemplates";

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

function getEmailConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.EMAIL_TO?.trim();

  if (!apiKey || !from || !to) {
    return null;
  }

  return { apiKey, from, to };
}

function createSubmissionId(): string {
  return `CF-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
}

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(date);
}

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
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Honeypot check - se compilato è un bot
    if (honeypot) {
      // Rispondi con successo per non far capire al bot che è stato bloccato
      return NextResponse.json(
        { message: "Email inviata con successo" },
        { status: 200 }
      );
    }

    // Validazione base
    if (!trimmedEmail || !trimmedName || !trimmedMessage || !acceptPrivacy) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Validazione lunghezza
    if (trimmedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Il nome non può superare ${MAX_NAME_LENGTH} caratteri` },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > MAX_EMAIL_LENGTH || /[\r\n]/.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Email non valida" },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Il messaggio non può superare ${MAX_MESSAGE_LENGTH} caratteri` },
        { status: 400 }
      );
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    const emailConfiguration = getEmailConfiguration();

    if (!emailConfiguration) {
      console.error("Configurazione email incompleta: servono RESEND_API_KEY, EMAIL_FROM e EMAIL_TO");
      return NextResponse.json(
        { error: "Servizio email non configurato correttamente" },
        { status: 500 }
      );
    }

    // Sanitizzazione dati per HTML
    const sanitizedName = sanitizeHtml(trimmedName);
    const sanitizedEmail = sanitizeHtml(trimmedEmail);
    const sanitizedMessage = sanitizeHtml(trimmedMessage);
    const submissionId = createSubmissionId();
    const submittedAt = formatSubmittedAt(new Date());

    // Log per debugging
    console.log("=== NUOVA EMAIL RICEVUTA ===");
    console.log("Richiesta:", submissionId);
    console.log("Da:", sanitizedEmail);
    console.log("Nome:", sanitizedName);
    console.log("Messaggio:", sanitizedMessage.substring(0, 100) + "...");
    console.log("IP:", ip);
    console.log("============================");

    const emailData = {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      submissionId,
      submittedAt,
    };

    const resend = new Resend(emailConfiguration.apiKey);

    // Invio email con Resend
    const { data, error } = await resend.emails.send({
      from: emailConfiguration.from,
      to: emailConfiguration.to,
      subject: buildContactEmailSubject(submissionId),
      replyTo: trimmedEmail,
      text: generateContactEmailText(emailData),
      html: generateContactEmailHTML(emailData),
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
