import { Router } from "@decelerate/cruiseh";

const app = new Router();

app.get("/", () => {
  return new Response(JSON.stringify({ pouet: "ping" }), {
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

export default {
  fetch(request: Request) {
    console.log("oeoeoe");
    return app.handler(request);
  },
} satisfies Deno.ServeDefaultExport;
