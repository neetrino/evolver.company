export const FooterBlockIcons = {
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2.2" fill="currentColor" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <rect x="4.5" y="8.5" width="15" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-block-icon-svg">
      <path
        d="M8.2 5.5c.4-1 1.4-1.4 2.3-1.1l1.8.7c.8.3 1.2 1.2 1 2l-.5 1.8c-.2.7.1 1.4.7 1.8l1.6 1.1c.6.4 1.4.3 1.9-.2l1.3-1.3c.7-.7 1.8-.6 2.4.2l1.2 1.5c.6.8.4 1.9-.5 2.4-2 1.1-4.4 1.5-6.7.9-3.3-.8-6.1-3.6-6.9-6.9-.6-2.3-.2-4.7.9-6.7.5-.9 1.6-1.1 2.4-.5Z"
        fill="currentColor"
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
      />
    </svg>
  ),
} as const;
