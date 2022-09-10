import { serve } from "https://deno.land/std@0.154.0/http/server.ts";
import jsonData from "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json" assert {
  type: "json",
};

const PORT = 8080;

const handler = (req) => {
  let { pathname } = new URL(req.url);
  pathname = pathname.replace("/", "");

  if (req.method === "GET" && pathname != "favicon.ico") {
    const data = jsonData[pathname];

    // Debug
    // console.log(pathname, data);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

await serve(handler, { port: PORT });
