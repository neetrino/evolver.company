"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/shared/Button";

type ContactFormLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

function ContactSuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-form-success-icon">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.2l2.4 2.4L16 9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactForm({ labels }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactMessage,
    {},
  );

  if (state.success) {
    return (
      <div className="contact-form-success" role="status">
        <ContactSuccessIcon />
        <p className="contact-form-success-text">{labels.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form">
      {state.error ? <p className="contact-form-error">{state.error}</p> : null}

      <div className="contact-field">
        <label htmlFor="name">{labels.name}</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field">
        <label htmlFor="email">{labels.email}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field">
        <label htmlFor="phone">{labels.phone}</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field contact-field--textarea">
        <label htmlFor="message">{labels.message}</label>
        <textarea id="message" name="message" required />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-form-actions">
        <Button type="submit" disabled={isPending} className="contact-form-submit">
          <span className="contact-form-submit-label">
            {isPending ? labels.sending : labels.submit}
          </span>
          <span className="contact-form-submit-shine" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
