export function logBlogError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : "Unknown blog error";
  console.error(`[blog] ${context}: ${message}`);
}
