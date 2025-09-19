import { Hono } from "hono";
import { serveStatic } from "hono/deno";

// Allow this file to type-check in non-Deno editors/builds
declare const Deno: undefined | { serve: (handler: (req: Request) => Response | Promise<Response>) => void };

const app = new Hono();

// 1) Serve anything in /assets/**
app.use("/assets/*", serveStatic({ root: "./dist/assets" }));

// 2) Catch *all* other files in dist (CSS, JS, images, etc.)
app.use("*", serveStatic({ root: "./dist" }));

// 3) Fallback to index.html for the SPA
app.get("*", serveStatic({ path: "./dist/index.html" }));

if (typeof Deno !== "undefined") {
  Deno.serve(app.fetch);
}
