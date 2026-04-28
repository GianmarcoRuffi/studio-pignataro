"use client";

import { FC, useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.scss";

interface FormData {
  email: string;
  name: string;
  message: string;
  acceptPrivacy: boolean;
  honeypot: string; // Campo honeypot anti-spam
}

interface FormErrors {
  email?: string;
  name?: string;
  message?: string;
  acceptPrivacy?: string;
}

// Costanti per validazione
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    message: "",
    acceptPrivacy: false,
    honeypot: "", // Campo honeypot - deve restare vuoto
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    if (!formData.name) {
      newErrors.name = "Il nome è obbligatorio";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Il nome deve contenere almeno 2 caratteri";
    } else if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = `Il nome non può superare ${MAX_NAME_LENGTH} caratteri`;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Il messaggio non può superare ${MAX_MESSAGE_LENGTH} caratteri`;
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy =
        "Devi accettare il trattamento dei dati personali";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          email: "",
          name: "",
          message: "",
          acceptPrivacy: false,
          honeypot: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Errore nell'invio del form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Contattaci</h2>
      <p className={styles.formDescription}>
        Compila il form per inviarci un messaggio. Ti risponderemo il prima
        possibile.
      </p>

      <form onSubmit={handleSubmit} className={`${styles.form} ${isSubmitting ? styles.submitting : ''}`} noValidate>
        {/* Honeypot field - nascosto, i bot lo compilano */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">
            Non compilare questo campo
          </label>
          <input
            type="text"
            id="website"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="La tua email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nome <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Il tuo nome"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.name ? styles.error : ""}`}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
          />
          {errors.name && (
            <span id="name-error" className={styles.errorMessage} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Messaggio <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Il tuo messaggio"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.formTextarea} ${errors.message ? styles.error : ""}`}
            rows={6}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <span id="message-hint" className={styles.characterCount}>
            {formData.message.length}/{MAX_MESSAGE_LENGTH} caratteri
          </span>
          {errors.message && (
            <span id="message-error" className={styles.errorMessage} role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id="acceptPrivacy"
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleChange}
              className={styles.checkbox}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={errors.acceptPrivacy ? "true" : "false"}
              aria-describedby={errors.acceptPrivacy ? "privacy-error" : undefined}
            />
            <label 
              htmlFor="acceptPrivacy" 
              className={`${styles.checkboxLabel} ${errors.acceptPrivacy ? styles.errorText : ""}`}
            >
              Accetto il trattamento dei dati personali secondo la{" "}
              <Link href="/privacy-policy" target="_blank" className={styles.privacyLink}>
                Privacy Policy
              </Link>{" "}
              per l&apos;invio di questa email <span className={styles.required}>*</span>
            </label>
          </div>
          {errors.acceptPrivacy && (
            <span id="privacy-error" className={styles.errorMessage} role="alert">
              {errors.acceptPrivacy}
            </span>
          )}
        </div>

        <p className={styles.privacyNote}>
          I tuoi dati saranno utilizzati esclusivamente per rispondere alla tua richiesta 
          e non saranno condivisi con terze parti.
        </p>

        {submitStatus === "success" && (
          <div className={styles.successMessage}>
            Messaggio inviato con successo! Ti risponderemo al più presto.
          </div>
        )}

        {submitStatus === "error" && (
          <div className={styles.errorMessage}>
            Si è verificato un errore. Riprova più tardi o contattaci
            direttamente via email.
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
