/**
 * Type representing the response of a getUrlParams function.
 */
type GetUrlParamsResponseType<K> =
  | K
  | Record<string, string | undefined>;

/**
 * Extracts URL parameters from a matched URL pattern.
 * @param {URLPattern} matchedUrl - The matched URL pattern.
 * @param {string} url - The URL to extract parameters from.
 * @returns {GetUrlParamsResponseType<K>} - The URL parameters.
 * @template K
 * @example
 * ```typescript
 * const pattern = new URLPattern({ pathname: "/hello/:id" });
 * const url = "/hello/123";
 * const params = getUrlParams<{ id: string }>(pattern, url);
 * console.log(params); // { id: "123" }
 * ```
 */
export function getUrlParams<K>(
  matchedUrl: URLPattern,
  url: string,
): GetUrlParamsResponseType<K> {
  const pattern = matchedUrl.exec(url);
  const params = pattern?.pathname.groups;
  if (!params) throw new Error("No url params found.");
  return params;
}
