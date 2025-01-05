/**
 * Enum representing HTTP methods.
 * @enum {string}
 */
export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Type representing a handler function that processes a request and returns a response.
 * @typedef {Function} Handler
 * @param {Request} request - The request object.
 * @returns {Response} - The response object.
 */
export type Handler = (request: Request) => Response | Promise<Response>;

/**
 * Type representing a route in the application.
 * @typedef {Object} Route
 * @property {URLPattern} pattern - The URL pattern for the route.
 * @property {HttpMethods | keyof typeof HttpMethods} method - The HTTP method for the route.
 * @property {Handler} handler - The handler function for the route.
 */
export type Route = {
  pattern: URLPattern;
  method: HttpMethods | keyof typeof HttpMethods;
  handler: Handler;
};
