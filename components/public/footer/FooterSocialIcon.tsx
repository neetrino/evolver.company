type FooterSocialIconProps = {
  platform: "facebook" | "instagram" | "linkedin";
};

export function FooterSocialIcon({ platform }: FooterSocialIconProps) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          d="M14 8.5h2.5V5h-2.5c-2.8 0-4.5 1.7-4.5 4.6V12H8v3.5h1.5V19h3.5v-3.5H16V12h-2.1l-.4-2.5H12V9.5c0-.8.2-1 1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
      <path
        d="M6.5 9.5v8h2.8v-8H6.5Zm1.4-4.5c-.9 0-1.5.6-1.5 1.4 0 .8.6 1.4 1.4 1.4h.1c.9 0 1.5-.6 1.5-1.4 0-.8-.6-1.4-1.5-1.4ZM10.8 9.5v8h2.7v-4.2c0-1.1.2-2.2 1.6-2.2 1.4 0 1.4 1.3 1.4 2.3V17.5H19v-4.5c0-2.3-.5-4.1-3.2-4.1-1.3 0-2.2.7-2.5 1.6h-.1V9.5h-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
