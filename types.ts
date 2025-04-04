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
 * @param {Request} request - The request object.
 * @param {Route} match - The matched route object.
 * @returns {Response} - The response object.
 */
export type Handler = (
  request: Request,
  matchedRoute: URLPattern,
) => Response | Promise<Response>;

/**
 * Type representing a route in the application.
 * @property {URLPattern} pattern - The URL pattern for the route.
 * @property {HttpMethods | keyof typeof HttpMethods} method - The HTTP method for the route.
 * @property {Handler} handler - The handler function for the route.
 */
export type Route = {
  pattern: URLPattern;
  method: HttpMethods | keyof typeof HttpMethods;
  handler: Handler;
};

/**
 * Type representing middleware options.
 * @property {string} path - The path to match.
 * @property {HttpMethods | keyof typeof HttpMethods} method - The HTTP method to match.
 */
export type MiddlewareOptions = {
  path?: string;
  exclude?: string[];
  method?: HttpMethods | keyof typeof HttpMethods;
};

/**
 * Type representing a middleware function that processes a request and calls the next middleware in the chain.
 * @param {Request} request - The request object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Response} - The response object.
 */
export type Middleware = (
  request: Request,
  next: () => Response | Promise<Response>,
) => Response | Promise<Response>;
