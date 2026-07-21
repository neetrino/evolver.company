"use client";

import { useActionState } from "react";
import {
  submitCareerApplication,
  type CareerApplicationFormState,
} from "@/app/career/actions";
import { Button } from "@/components/shared/Button";
import type { CareerPageContent } from "@/lib/career-content";

type CareerApplyFormProps = {
  jobId: string;
  labels: CareerPageContent["apply"];
};

function SuccessIcon() {
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

export function CareerApplyForm({ jobId, labels }: CareerApplyFormProps) {
  const [state, formAction, isPending] = useActionState<
    CareerApplicationFormState,
    FormData
  >(submitCareerApplication, {});

  if (state.success) {
    return (
      <div className="contact-form-success" role="status">
        <SuccessIcon />
        <p className="contact-form-success-text">{labels.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form">
      <input type="hidden" name="jobId" value={jobId} />
      {state.error ? <p className="contact-form-error">{state.error}</p> : null}

      <div className="contact-field">
        <label htmlFor="career-name">{labels.name}</label>
        <input id="career-name" name="name" type="text" required autoComplete="name" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field">
        <label htmlFor="career-email">{labels.email}</label>
        <input id="career-email" name="email" type="email" required autoComplete="email" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field">
        <label htmlFor="career-phone">{labels.phone}</label>
        <input id="career-phone" name="phone" type="tel" autoComplete="tel" />
        <span className="contact-field-focus" aria-hidden="true" />
      </div>

      <div className="contact-field contact-field--textarea">
        <label htmlFor="career-message">{labels.message}</label>
        <textarea id="career-message" name="message" required rows={5} />
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
