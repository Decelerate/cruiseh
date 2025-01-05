import { Router } from "../../router.ts";

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
  const body = await req.json();

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
