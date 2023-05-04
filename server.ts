import { serve } from "https://deno.land/std@0.154.0/http/server.ts";
const PORT = 8080;

const handler = async (req: Request) => {
  const url =
    "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2023.json";
  const json = await fetch(url).then((res) => res.json());
  let { pathname } = new URL(req.url);
  pathname = pathname.replace("/", "").toUpperCase();

  if (req.method === "GET" && pathname != "favicon.ico") {
    const data = json[pathname];
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

await serve(handler, { port: PORT });
