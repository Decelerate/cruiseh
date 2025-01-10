import { type Handler, HttpMethods, type Route } from "./types.ts";

// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  // @ts-ignore only for npm build
  require("urlpattern-polyfill");
}

/**
 * Router class
 * @class
 * @classdesc Router class to handle routes
 * @returns {Router}
 * @example
 * Example 1:
 * ```typescript
 * const router = new Router();
 * router.get("/hello", (request) => new Response("Hello world"));
 * ```
 *
 * Example 2:
 * ```typescript
 * const router = new Router();
 * router.post("/hello", (request) => new Response("Hello world"));
 * ```
 *
 * Example 3:
 * ```typescript
 * const router = new Router();
 * router.put("/hello", (request) => new Response("Hello world"));
 * ```
 *
 * Example 2:
 * ```typescript
 * const router = new Router();
 * router.delete("/hello", (request) => new Response("Hello world"));
 * ```
 */
export class Router {
  /**
   * Routes
   * @private
   * @type {Route[]}
   * @memberof Router
   */
  #routes: Route[] = [];

  /**
   * Registers a GET route with the specified path and handler.
   * @param {string} path - The path to match.
   * @param {Handler} handler - The handler to execute when the route is matched.
   */
  get(path: string, handler: Handler) {
    this.#addRoute(path, HttpMethods.GET, handler);
  }

  /**
   * Registers a POST route with the specified path and handler.
   * @param {string} path - The path to match.
   * @param {Handler} handler - The handler to execute when the route is matched.
   */
  post(path: string, handler: Handler) {
    this.#addRoute(path, HttpMethods.POST, handler);
  }

  /**
   * Registers a PUT route with the specified path and handler.
   * @param {string} path - The path to match.
   * @param {Handler} handler - The handler to execute when the route is matched.
   */
  put(path: string, handler: Handler) {
    this.#addRoute(path, HttpMethods.PUT, handler);
  }

  /**
   * Registers a DELETE route with the specified path and handler.
   * @param {string} path - The path to match.
   * @param {Handler} handler - The handler to execute when the route is matched.
   */
  delete(path: string, handler: Handler) {
    this.#addRoute(path, HttpMethods.DELETE, handler);
  }

  /**
   * Adds a route to the router.
   * @private
   * @param {string} path - The path to match.
   * @param {HttpMethods} method - The HTTP method to match.
   * @param {Handler} handler - The handler to execute when the route is matched.
   * This function creates a URL pattern from the provided path and stores the route information.
   */
  #addRoute(path: string, method: HttpMethods, handler: Handler) {
    const pattern = new URLPattern({
      pathname: path,
    });

    this.#routes.push({
      pattern,
      method,
      handler,
    });
  }

  /**
   * Handles incoming requests by matching them to the appropriate route.
   * @param {Request} request - The incoming request to handle.
   * @returns {Response} - The response generated by the matched route handler or an error response.
   */
  handler(request: Request): Response | Promise<Response> {
    const match =
      this.#routes.filter((route) => route.pattern.exec(request.url))[0];

    if (match) {
      try {
        return match.handler(request);
      } catch (err) {
        console.error("Invalid body request", err);

        return new Response("Internal server error", {
          status: 500,
        });
      }
    }

    return new Response("Not found", { status: 404 });
  }
}
