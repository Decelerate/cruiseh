# Cruiseh
[![jsr.io/@decelerate/cruiseh](https://jsr.io/badges/@decelerate/cruiseh)](https://jsr.io/@decelerate/cruiseh)
[![jsr.io/@decelerate/cruiseh score](https://jsr.io/badges/@decelerate/cruiseh/score)](https://jsr.io/@decelerate/cruiseh)

A simple TypeScript router class for handling HTTP routes, inspired by Express.js. This router supports GET, POST, PUT, and DELETE methods.

This library is made for "training" purpose but you can use it for small project.

Feel free to make a Pull request or issue if you want additional features, we don't bite ! 🧛

> [!WARNING]
> Only work with deno


## Features

- Register routes for different HTTP methods (GET, POST, PUT, DELETE)
- Simple and easy-to-use API

## Installation

For now, the only way to use it is with JSR inside deno project

```bash
deno install @decelerate/cruiseh
```

## Usage 

Here's an example of how to use the Router class with deno serve :

```ts
// server.ts
import { Router } from '@decelerate/cruiseh';

const app = new Router();

// Register routes
app.get("/hello", (request) => new Response("Hello world"));

app.post("/hello", async (req) => {
  const body = await req.json();

  // your logic

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

app.put("/hello", async (req) => {
  const body = await req.json();

  // your logic

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

app.delete("/hello", (request) => new Response("Hello world"));

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
