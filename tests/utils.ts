/**
 * Creates a fake Request object for testing purposes.
 * @param {string} url - The URL of the request.
 * @param {string} method - The HTTP method of the request.
 * @param {Record<string, string>} [headers] - Optional headers for the request.
 * @param {any} [body] - Optional body for the request.
 * @returns {Request} - The fake Request object.
 */
export function createFakeRequest(
  url: string,
  method: string,
  headers: Record<string, string> = {},
  body: unknown = null
): Request {
  const init: RequestInit = {
    method,
    headers: new Headers(headers),
  };

  if (body) {
    init.body = JSON.stringify(body);
    (init.headers as Headers).set("Content-Type", "application/json");
  }

  return new Request(url, init);
}
