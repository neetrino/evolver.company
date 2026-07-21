"use client";

import { useEffect, useId, useRef } from "react";

type AdminSheetProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  toolbar?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
};

export function AdminSheet({
  open,
  title,
  subtitle,
  toolbar,
  onClose,
  children,
  size = "md",
}: AdminSheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="admin-sheet" role="presentation">
      <button
        type="button"
        className="admin-sheet-backdrop"
        aria-label="Close panel"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`admin-sheet-panel admin-sheet-panel--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="admin-sheet-header">
          <div className="admin-sheet-header-top">
            <div className="admin-sheet-header-copy">
              <p className="admin-sheet-kicker">Evolver Admin</p>
              <h2 id={titleId} className="admin-sheet-title">
                {title}
              </h2>
              {subtitle ? <p className="admin-sheet-subtitle">{subtitle}</p> : null}
            </div>
            <button type="button" className="admin-sheet-close" onClick={onClose}>
              Close
            </button>
          </div>

          {toolbar ? <div className="admin-sheet-toolbar">{toolbar}</div> : null}
        </header>

        <div className="admin-sheet-body">{children}</div>
      </div>
    </div>
  );
}
