/** A public HTTPS site base (including a project path), never inferred from the request host or a preview URL. */
export function publicOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.hostname === 'localhost' ||
      !url.hostname.includes('.') ||
      /^\d+(\.\d+){3}$/.test(url.hostname) ||
      url.hostname.endsWith('.local')
    )
      return null;
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  } catch {
    return null;
  }
}
