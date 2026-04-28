# Setup Email con Resend

Per far funzionare il form di contatto, devi configurare Resend per l'invio delle email.

## Step 1: Crea un account su Resend

1. Vai su [https://resend.com](https://resend.com)
2. Registrati gratuitamente (3000 email/mese gratis)
3. Verifica la tua email

## Step 2: Ottieni l'API Key

1. Vai su [https://resend.com/api-keys](https://resend.com/api-keys)
2. Clicca su "Create API Key"
3. Dai un nome (es: "Studio Pignataro Production")
4. Copia la chiave (inizia con `re_`)

## Step 3: Configura le variabili d'ambiente

1. Apri il file `.env.local` nella root del progetto
2. Incolla la tua API key:

```env
RESEND_API_KEY=re_tua_chiave_api_qui
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=gianmarco.ruffi@outlook.it
```

### Per Testing (default)
- `EMAIL_FROM=onboarding@resend.dev` - Email di test di Resend
- `EMAIL_TO=gianmarco.ruffi@outlook.it` - Dove riceverai i messaggi di test

### Per Produzione (consigliato)
1. Verifica il tuo dominio su Resend:
   - Vai su [https://resend.com/domains](https://resend.com/domains)
   - Aggiungi `archpignataro.it`
   - Segui le istruzioni per configurare i record DNS

2. Dopo la verifica, aggiorna `.env.local`:
```env
EMAIL_FROM=noreply@archpignataro.it
EMAIL_TO=info@archpignataro.it
```

## Step 4: Riavvia il server

```bash
npm run dev
```

## Step 5: Testa il form

1. Vai su http://localhost:3000/contacts
2. Scorri fino al form "Contattaci"
3. Compila i campi e invia
4. Controlla la tua email!

## Troubleshooting

### "Servizio email non configurato correttamente"
- Verifica che `RESEND_API_KEY` sia impostata nel file `.env.local`
- Riavvia il server dopo aver modificato `.env.local`

### "Errore nell'invio dell'email"
- Controlla che l'API key sia valida
- Verifica che `EMAIL_FROM` sia `onboarding@resend.dev` o un dominio verificato
- Controlla i log nella console del server per dettagli

### Email non arriva
- Controlla la cartella spam
- Verifica che `EMAIL_TO` sia corretto
- Controlla il dashboard di Resend per vedere se l'email è stata inviata

## Variabili d'ambiente per Vercel

Quando fai il deploy su Vercel, aggiungi le variabili d'ambiente:

1. Vai su Vercel Dashboard
2. Seleziona il progetto
3. Settings → Environment Variables
4. Aggiungi:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`

## Link utili

- [Resend Dashboard](https://resend.com)
- [Resend API Keys](https://resend.com/api-keys)
- [Resend Domains](https://resend.com/domains)
- [Resend Docs](https://resend.com/docs)
