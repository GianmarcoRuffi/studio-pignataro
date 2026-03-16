"use client";

import { FC, useState, FormEvent } from "react";
import styles from "./ContactForm.module.scss";

interface FormData {
  email: string;
  name: string;
  message: string;
  acceptPrivacy: boolean;
}

interface FormErrors {
  email?: string;
  name?: string;
  message?: string;
  acceptPrivacy?: string;
}

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    message: "",
    acceptPrivacy: false,
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
    }

    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="La tua email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Il tuo nome"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.name ? styles.error : ""}`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Il tuo messaggio"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.formTextarea} ${errors.message ? styles.error : ""}`}
            rows={6}
            disabled={isSubmitting}
          />
          {errors.message && (
            <span className={styles.errorMessage}>{errors.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleChange}
              className={styles.checkbox}
              disabled={isSubmitting}
            />
            <span className={errors.acceptPrivacy ? styles.errorText : ""}>
              Accetto il trattamento dei dati personali per l'invio di questa
              email
            </span>
          </label>
          {errors.acceptPrivacy && (
            <span className={styles.errorMessage}>{errors.acceptPrivacy}</span>
          )}
        </div>

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
