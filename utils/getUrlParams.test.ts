import { assertEquals } from "jsr:@std/assert";
import { getUrlParams } from "./getUrlParams.ts";

Deno.test("getUrlParams should return id params from route", () => {
  const pattern = new URLPattern({ pathname: "/hello/:id" });
  const url = "http://localhost:3000/hello/123";
  const params = getUrlParams<{ id: string }>(pattern, url);

  assertEquals(params.id, "123");
});

Deno.test("getUrlParams should fail", () => {
  let fail = false;

  try {
    const pattern = new URLPattern({ pathname: "/hello/:id" });
    const url = "http://localhost:3000/hello/";
    getUrlParams<{ id: string }>(pattern, url);
  } catch (_err) {
    fail = true;
  }

  assertEquals(fail, true);
});
