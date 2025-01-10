import http from "http";
import { Router } from "@decelerate/cruiseh";
import { Readable } from "stream";

const app = new Router();

function convertToRequest(req) {
  const { method, headers, url } = req;
  const fullUrl = `http://${headers.host}${url}`;

  const options = {
    method,
    headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    options.body = Readable.from(req);
  }

  return new Request(fullUrl, options);
}

app.get("/", (_req, res) => {
  res.end(JSON.stringify({ pouet: "ping" }));
  return res;
});

app.post("/hello", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(body);
  });

  return req;
});

const server = http.createServer(async (req, res) => {
  const request = convertToRequest(req);
  const response = await app.handler(request);

  res.writeHead(response.status, Object.fromEntries(response.headers));
  const responseBody = await response.text();
  res.end(responseBody);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
