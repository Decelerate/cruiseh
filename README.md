# Cruiseh
[![jsr.io/@decelerate/cruiseh](https://jsr.io/badges/@decelerate/cruiseh)](https://jsr.io/@decelerate/cruiseh)
[![jsr.io/@decelerate/cruiseh score](https://jsr.io/badges/@decelerate/cruiseh/score)](https://jsr.io/@decelerate/cruiseh)
[![cruiseh ci](https://github.com/decelerate/cruiseh/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/decelerate/cruiseh)

> [!CAUTION]
> Only work with deno runtime for the moment
>
> Don't use it in production until 1.0.0 release

A simple TypeScript router class for handling HTTP routes, inspired by Express.js. This router supports GET, POST, PUT, and DELETE methods.

This library is made for "training" purpose but you can use it for small project.

Feel free to make a Pull request or issue if you want additional features, we don't bite ! 🧛

## Features

- Register routes for different HTTP methods (GET, POST, PUT, DELETE)
- Middleware support
- Simple and easy-to-use API

## Installation

For now, the only way to use it is with JSR inside deno project

```bash
deno add jsr:@decelerate/cruiseh
```

## Usage 

Here's an example of how to use the Router class with deno serve :

```ts
// server.ts
import { Router } from '@decelerate/cruiseh';
import { getUrlParams } from "@decelerate/cruiseh/utils/getUrlParams";

const app = new Router();

// Register routes
app.get("/hello", (request) => new Response("Hello world"));

app.post("/hello", async (req) => {
  const body = { message: "Message from body" };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

// With params
app.get("/hello/:id", (_req, matchedRoute) => {
  // If you don't want to use utils function you can do the same thing manually
  //const routePattern = matchedRoute.exec(req.url);
  //const params = routePattern?.pathname.groups;

  // For more secure way, you may need to try/catch your operations
  const params = getUrlParams<{ id: string }>(matchedRoute, req.url);

  const body = { id: params.id };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

// Register middleware (active on all routes)
app.use(async (req, next) => {
  console.log(`Request made to: ${req.url}`);
  return next();
});

// Register middleware (active on GET /hello and children routes)
app.use(
  async (req, next) => {
    console.log(`Request made to: ${req.url}`);
    return next();
  },
  {
    path: "/hello",
    method: "POST",
  }
);

// Handle incoming request
export default {
  fetch(request: Request) {
    return app.handler(request);
  },
} satisfies Deno.ServeDefaultExport;
```

You can now run :
```bash
deno serve -A --watch server.ts
```

## API
`use(middleware: Middleware, options?: MiddlewareOptions)`

Registers a middleware function to be executed for every request.

`get(path: string, handler: Handler)`

Registers a GET route with the specified path and handler.

`post(path: string, handler: Handler)`

Registers a POST route with the specified path and handler.

`put(path: string, handler: Handler)`

Registers a PUT route with the specified path and handler.

`delete(path: string, handler: Handler)`

Registers a DELETE route with the specified path and handler.

`handler(request: Request): Response`

Handles incoming requests by matching them to the appropriate route.

## Contributing
See [Contributing guide](https://github.com/Decelerate/cruiseh/tree/main/CONTRIBUTING.md)

## License
This project is licensed under the MIT License.
