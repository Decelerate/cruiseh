import { Router } from "@decelerate/cruiseh";
import { getUrlParams } from "@decelerate/cruiseh/utils/getUrlParams";

const app = new Router();

// Middleware for every routes
app.use((_request, next) => {
  console.log("Middleware everyware");
  return next();
});

// Middleware for /hello and associate children like /hello/children/another-children
app.use(
  (_request, next) => {
    console.log("Middleware /hello");
    return next();
  },
  {
    path: "/hello",
  },
);

// Middleware for GET request inside /hello/:id and associate children children
app.use(
  (_request, next) => {
    console.log("Middleware GET /hello/:id");
    return next();
  },
  {
    path: "/hello/:id",
    method: "GET",
  },
);

app.get("/", () => {
  return new Response(JSON.stringify({ ping: "ping" }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

app.post("/hello", async (req) => {
  let body;

  try {
    body = await req.json();
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch {
    return new Response("No JSON body found.", {
      status: 400,
    });
  }
});

// get id params from url
app.get("/hello/:id", (req, matchedRoute) => {
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

// from post request
app.post("/hello/:id", async (req, matchedRoute) => {
  let body;
  const { id } = getUrlParams<{ id: string }>(matchedRoute, req.url);

  try {
    body = await req.json();
    body.idParam = id;
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch {
    return new Response("No JSON body found.", {
      status: 400,
    });
  }
});

export default {
  fetch(request: Request) {
    return app.handler(request);
  },
} satisfies Deno.ServeDefaultExport;
