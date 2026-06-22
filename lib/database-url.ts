const LEGACY_SSL_MODES = new Set(["require", "prefer", "verify-ca"]);

/**
 * Maps legacy pg SSL modes to verify-full to avoid pg-connection-string v3 warnings
 * and keep strict TLS verification (Neon-compatible).
 */
export function normalizeDatabaseUrl(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslmode = url.searchParams.get("sslmode");

    if (!sslmode || LEGACY_SSL_MODES.has(sslmode)) {
      url.searchParams.set("sslmode", "verify-full");
    }

    return url.toString();
  } catch {
    return connectionString;
  }
}
