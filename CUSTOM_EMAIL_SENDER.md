# Configurare un Mittente Email Personalizzato

## Panoramica

Attualmente, le email del form di contatto vengono inviate da `onboarding@resend.dev` (indirizzo di test di Resend). Per usare un mittente personalizzato come `studiopignataro@archpignataro.it` o `noreply@archpignataro.it`, devi **verificare il tuo dominio** su Resend.

## Perché è Necessaria la Verifica del Dominio

I servizi email moderni richiedono la verifica del dominio per:
- Prevenire spam e phishing
- Garantire l'autenticità del mittente  
- Migliorare la deliverability (le email non finiscono in spam)
- Rispettare le normative (SPF, DKIM, DMARC)

## Step 1: Verifica il Dominio su Resend

### 1.1 Accedi a Resend Dashboard

1. Vai su [https://resend.com/domains](https://resend.com/domains)
2. Fai login con il tuo account Resend

### 1.2 Aggiungi il Dominio

1. Clicca su **"Add Domain"**
2. Inserisci il tuo dominio: `archpignataro.it`
3. Clicca su **"Add"**

### 1.3 Configura i Record DNS

Resend ti fornirà i record DNS da aggiungere. Dovrai configurare:

#### Record SPF (Sender Policy Framework)
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

#### Record DKIM (DomainKeys Identified Mail)
```
Type: TXT
Name: resend._domainkey
Value: [valore fornito da Resend]
```

#### Record DMARC (Domain-based Message Authentication)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:info@archpignataro.it
```

### 1.4 Aggiungi i Record al tuo Provider DNS

1. Accedi al pannello di controllo del tuo provider DNS (es: Aruba, GoDaddy, Cloudflare, ecc.)
2. Vai alla sezione **DNS Management** o **Gestione DNS**
3. Aggiungi i record forniti da Resend
4. Salva le modifiche

**⚠️ Nota**: La propagazione dei record DNS può richiedere da 15 minuti a 48 ore.

### 1.5 Verifica lo Stato

1. Torna su [https://resend.com/domains](https://resend.com/domains)
2. Clicca su **"Verify"** accanto al tuo dominio
3. Quando tutti i record sono corretti, vedrai un segno di spunta verde ✅

## Step 2: Configura le Variabili d'Ambiente

Una volta verificato il dominio, aggiorna il file `.env.local`:

```env
# API Key di Resend
RESEND_API_KEY=re_tua_chiave_api_qui

# Mittente personalizzato (obbligatorio, dominio verificato)
EMAIL_FROM=studiopignataro@archpignataro.it
# Oppure:
# EMAIL_FROM=noreply@archpignataro.it
# EMAIL_FROM=info@archpignataro.it

# Destinatario dei messaggi (obbligatorio)
EMAIL_TO=info@archpignataro.it
```

Il form non usa piu' fallback impliciti: se una di queste variabili manca, l'API risponde con errore di configurazione.

### Opzioni per EMAIL_FROM

Puoi usare qualsiasi indirizzo email sul tuo dominio verificato:

| Indirizzo | Uso Consigliato |
|-----------|------------------|
| `noreply@archpignataro.it` | Email automatiche (form di contatto) |
| `info@archpignataro.it` | Email da casella monitorata |
| `studiopignataro@archpignataro.it` | Email personalizzate |
| `form@archpignataro.it` | Dedicato solo ai form |

**💡 Consigliato**: Usa `noreply@archpignataro.it` o `form@archpignataro.it` per le email automatiche del form.

## Step 3: Verifica la Configurazione su Vercel

Se usi Vercel per il deployment, aggiorna anche le variabili d'ambiente lì:

1. Vai su [https://vercel.com](https://vercel.com)
2. Seleziona il progetto **studio-pignataro**
3. Vai su **Settings** → **Environment Variables**
4. Imposta sia `Preview` sia `Production`
5. Usa questi valori consigliati:
	- `Production`: `EMAIL_FROM=noreply@archpignataro.it`, `EMAIL_TO=info@archpignataro.it`
	- `Preview`: `EMAIL_FROM=noreply@archpignataro.it` oppure `onboarding@resend.dev` se stai ancora testando, con `EMAIL_TO` su una casella separata
6. Clicca su **Save**
7. Fai un nuovo deploy o riavvia l'applicazione

## Risposte e threading

- L'email ricevuta dal form imposta automaticamente `Reply-To` sull'indirizzo dell'utente.
- Per rispondere mantenendo il messaggio originale quotato, usa il normale comando di risposta del tuo client email.
- Ogni richiesta ha un ID dedicato nel subject, utile per tenere separati i thread e riconoscere piu' richieste dallo stesso mittente.

## Step 4: Riavvia il Server di Sviluppo

```bash
# Ferma il server (Ctrl+C)
# Riavvia
npm run dev
```

## Step 5: Testa l'Invio

1. Vai su http://localhost:3000/contacts
2. Compila e invia il form
3. Controlla l'email ricevuta
4. Verifica che il mittente sia il tuo indirizzo personalizzato

## Vantaggi di un Mittente Personalizzato

✅ **Professionalità**: Le email arrivano da `studiopignataro@archpignataro.it` invece di `onboarding@resend.dev`

✅ **Branding**: Rafforza l'identità del tuo studio

✅ **Affidabilità**: Meno probabilità di finire nello spam

✅ **Tracciabilità**: Più facile gestire le email del form

✅ **Conformità**: Rispetta gli standard email (SPF, DKIM, DMARC)

## Troubleshooting

### Il dominio non viene verificato

- Verifica di aver inserito correttamente tutti i record DNS
- Attendi almeno 1 ora per la propagazione DNS
- Usa un tool come [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) per verificare i record DNS

### Le email finiscono in spam

- Assicurati che tutti i record DNS siano verificati (SPF, DKIM, DMARC)
- Configura correttamente il record DMARC
- Evita parole spam nel subject e nel body

### Errore "Email address is not verified"

- Il dominio non è ancora verificato su Resend
- Controlla lo stato su [https://resend.com/domains](https://resend.com/domains)
- Verifica che l'indirizzo email appartenga al dominio verificato

### Le email non arrivano

- Controlla che `EMAIL_FROM` sia configurato correttamente
- Verifica i log di Resend su [https://resend.com/emails](https://resend.com/emails)
- Controlla la cartella spam

## Costi

La verifica del dominio è **gratuita** con il piano free di Resend (3000 email/mese).

## Link Utili

- [Resend Domains Dashboard](https://resend.com/domains)
- [Resend Documentation - Domains](https://resend.com/docs/dashboard/domains/introduction)
- [MXToolbox - DNS Lookup](https://mxtoolbox.com/SuperTool.aspx)
- [SPF Record Checker](https://mxtoolbox.com/spf.aspx)
- [DKIM Validator](https://mxtoolbox.com/dkim.aspx)
