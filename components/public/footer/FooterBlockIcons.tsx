export const FooterBlockIcons = {
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <rect
        x="4.5"
        y="8.5"
        width="15"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 13h15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <path
        d="M8.5 5.5c.4 2.1 1.4 4.1 2.9 5.9 1.5 1.8 3.4 3.1 5.5 3.8l1.6-1.6c.3-.3.8-.4 1.2-.2 1 .4 2.1.7 3.3.7.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.3 20 4 13.7 4 5c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.3 2.3.7 3.3.2.4.1.9-.2 1.2L8.5 5.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  links: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <path
        d="M10.1 13.9 8.6 15.4a3.5 3.5 0 0 1-5-5l1.5-1.5M13.9 10.1l1.5-1.5a3.5 3.5 0 0 1 5 5l-1.5 1.5M9 15l6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;
