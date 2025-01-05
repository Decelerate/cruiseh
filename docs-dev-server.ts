import { serveDir } from "jsr:@std/http/file-server";

Deno.serve({ port: 8889 }, (req) =>
  serveDir(req, {
    fsRoot: "docs",
  }));
