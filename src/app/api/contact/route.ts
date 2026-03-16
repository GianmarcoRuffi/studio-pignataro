import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name, message, acceptPrivacy } = await request.json();

    // Validazione base
    if (!email || !name || !message || !acceptPrivacy) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    // Log per debugging
    console.log("=== NUOVA EMAIL RICEVUTA ===");
    console.log("Da:", email);
    console.log("Nome:", name);
    console.log("Messaggio:", message);
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
      subject: `Nuovo messaggio da ${name}`,
      replyTo: email,
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
                <div>${name}</div>
              </div>
              <div class="info-box">
                <div class="label">Email:</div>
                <div><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="info-box">
                <div class="label">Messaggio:</div>
                <div class="message-content">${message.replace(/\n/g, "<br>")}</div>
              </div>
              <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                <em>Puoi rispondere direttamente a questa email per contattare ${name}.</em>
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
