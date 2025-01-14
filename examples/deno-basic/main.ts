import { Router } from "@decelerate/cruiseh";

const app = new Router();

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
app.get("/hello/:id", (_req, matchedRoute) => {
  const id = matchedRoute?.pathname.groups.id;
  const body = { id };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});

export default {
  fetch(request: Request) {
    return app.handler(request);
  },
} satisfies Deno.ServeDefaultExport;
