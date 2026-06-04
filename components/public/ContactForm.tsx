"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/shared/Button";

type ContactFormProps = {
  labels: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
};

export function ContactForm({ labels }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactMessage,
    {},
  );

  if (state.success) {
    return <p className="form-success">{labels.success}</p>;
  }

  return (
    <form action={formAction} className="contact-form">
      {state.error ? <p className="form-error">{state.error}</p> : null}

      <div className="field">
        <label htmlFor="name">{labels.name}</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="email">{labels.email}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="phone">{labels.phone}</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="field">
        <label htmlFor="message">{labels.message}</label>
        <textarea id="message" name="message" required />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "..." : labels.submit}
      </Button>
    </form>
  );
}
