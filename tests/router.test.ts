import { assertEquals } from "jsr:@std/assert";
import { Router } from "../router.ts";
import { createFakeRequest } from "./utils.ts";

Deno.test("Router should handle GET requests", async () => {
  const router = new Router();

  router.get("/hello", () => new Response("Hello world"));

  const request = createFakeRequest("http://localhost/hello", "GET");
  const response = await router.handler(request);

  assertEquals(await response.text(), "Hello world");
  assertEquals(response.status, 200);
});

Deno.test("Router should handle POST requests", async () => {
  const router = new Router();

  router.post("/hello", async (request) => {
    const body = await request.json();
    return new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });
  });

  const request = createFakeRequest(
    "http://localhost/hello",
    "POST",
    {},
    { message: "Hello world" },
  );
  const response = await router.handler(request);

  assertEquals(await response.json(), { message: "Hello world" });
  assertEquals(response.status, 200);
});

Deno.test("Router should handle PUT requests", async () => {
  const router = new Router();

  router.put("/hello", async (request) => {
    const body = await request.json();
    return new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });
  });

  const request = createFakeRequest(
    "http://localhost/hello",
    "PUT",
    {},
    { message: "Hello world" },
  );
  const response = await router.handler(request);

  assertEquals(await response.json(), { message: "Hello world" });
  assertEquals(response.status, 200);
});

Deno.test("Router should handle DELETE requests", async () => {
  const router = new Router();

  router.delete("/hello", (_) => {
    return new Response("Delete confirmed");
  });

  const request = createFakeRequest("http://localhost/hello", "DELETE", {});
  const response = await router.handler(request);

  assertEquals(await response.text(), "Delete confirmed");
  assertEquals(response.status, 200);
});

Deno.test("Router should handle ALL requests", async () => {
  const router = new Router();

  router.all("/api/*", (_) => {
    return new Response("HandleApiResponse");
  });

  const request = createFakeRequest(
    "http://localhost/api/random/endpoint",
    "GET",
  );
  const response = await router.handler(request);

  assertEquals(await response.text(), "HandleApiResponse");
  assertEquals(response.status, 200);
});

Deno.test("Router should fail to GET route", async () => {
  const router = new Router();

  router.get("/hello", () => new Response("Hello world"));

  const request = createFakeRequest("http://localhost/hello", "POST");
  const response = await router.handler(request);

  assertEquals(response.status, 404);
});

Deno.test("Router should execute middleware", async () => {
  const router = new Router();

  let middlewareExecuted = false;
  router.use((_, next) => {
    middlewareExecuted = true;
    return next();
  });

  router.get("/hello", () => new Response("Hello world"));

  const request = createFakeRequest("http://localhost/hello", "GET");
  const response = await router.handler(request);

  assertEquals(middlewareExecuted, true);
  assertEquals(await response.text(), "Hello world");
  assertEquals(response.status, 200);
});

Deno.test("Router should return 404 for unknown routes", async () => {
  const router = new Router();

  const request = createFakeRequest("http://localhost/unknown", "GET");
  const response = await router.handler(request);

  assertEquals(response.status, 404);
  assertEquals(await response.text(), "Not found");
});
