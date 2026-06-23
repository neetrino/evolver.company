"use client";

import {
  contactDelayStyle,
  CONTACT_ENTER_BASE_DELAY_S,
  CONTACT_ENTER_STEP_DELAY_S,
} from "@/lib/contact-motion";
import type { ContactContent } from "@/lib/content";

type ContactInfoPanelProps = {
  info: ContactContent["info"];
};

type ContactInfoItemProps = {
  icon: "email" | "phone" | "location" | "hours";
  label: string;
  children: React.ReactNode;
  delay: number;
};

function ContactInfoIcon({ icon }: { icon: ContactInfoItemProps["icon"] }) {
  if (icon === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-info-icon-svg">
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 8l6.5 4.5L18.5 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-info-icon-svg">
        <path
          d="M8.5 5.5c.4 2.1 1.4 4.1 2.9 5.9 1.5 1.8 3.4 3.1 5.5 3.8l1.6-1.6c.3-.3.8-.4 1.2-.2 1 .4 2.1.7 3.3.7.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.3 20 4 13.7 4 5c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.3 2.3.7 3.3.2.4.1.9-.2 1.2L8.5 5.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-info-icon-svg">
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-info-icon-svg">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v4.2l2.6 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactInfoItem({ icon, label, children, delay }: ContactInfoItemProps) {
  return (
    <article
      className="contact-info-item contact-animate"
      style={contactDelayStyle(delay)}
    >
      <span className="contact-info-item-glow" aria-hidden="true" />
      <span className="contact-info-icon" aria-hidden="true">
        <ContactInfoIcon icon={icon} />
      </span>
      <div className="contact-info-copy">
        <span className="contact-info-label">{label}</span>
        <div className="contact-info-value">{children}</div>
      </div>
    </article>
  );
}

export function ContactInfoPanel({ info }: ContactInfoPanelProps) {
  const baseDelay = CONTACT_ENTER_BASE_DELAY_S + CONTACT_ENTER_STEP_DELAY_S;

  return (
    <aside className="contact-info-panel">
      <header className="contact-info-header contact-animate" style={contactDelayStyle(CONTACT_ENTER_BASE_DELAY_S)}>
        <h2 className="contact-info-title">{info.title}</h2>
      </header>

      <div className="contact-info-list">
        <ContactInfoItem icon="email" label={info.emailLabel} delay={baseDelay}>
          <a href={`mailto:${info.email}`} className="contact-info-link">
            {info.email}
          </a>
        </ContactInfoItem>

        <ContactInfoItem icon="phone" label={info.phoneLabel} delay={baseDelay + CONTACT_ENTER_STEP_DELAY_S}>
          <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="contact-info-link">
            {info.phone}
          </a>
        </ContactInfoItem>

        <ContactInfoItem icon="location" label={info.locationLabel} delay={baseDelay + 2 * CONTACT_ENTER_STEP_DELAY_S}>
          <address className="contact-info-address">
            {info.locationLines.map((line) => (
              <span key={line} className="contact-info-address-line">
                {line}
              </span>
            ))}
          </address>
        </ContactInfoItem>

        <ContactInfoItem icon="hours" label={info.hoursLabel} delay={baseDelay + 3 * CONTACT_ENTER_STEP_DELAY_S}>
          <span>{info.hours}</span>
        </ContactInfoItem>
      </div>
    </aside>
  );
}
