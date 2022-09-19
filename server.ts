import { serve } from "https://deno.land/std@0.154.0/http/server.ts";
const PORT = 8080;

const handler = async (req: Request) => {
  const url =
    "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json";
  const json = await fetch(url).then((res) => res.json());
  const { pathname } = new URL(req.url);

  if (req.method === "GET" && pathname != "/favicon.ico") {
    const data = json[pathname.replace("/", "")];
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

await serve(handler, { port: PORT });
