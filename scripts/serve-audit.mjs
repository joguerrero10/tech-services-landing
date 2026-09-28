// Test-only HTML fixtures, never copied to public or dist. Browser manipulation is not required.
import { createServer } from 'node:http';
const upstream = 'http://127.0.0.1:4300';
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, upstream);
    const response = await fetch(`${upstream}${url.pathname}`);
    let body = Buffer.from(await response.arrayBuffer());
    const type = response.headers.get('content-type') ?? 'application/octet-stream';
    if (type.includes('text/html')) {
      let html = body.toString();
      if (url.searchParams.get('audit') === 'text-200')
        html = html.replace('</head>', '<style>html {font-size:200% !important}</style></head>');
      if (url.searchParams.get('audit') === 'no-js')
        html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
      body = Buffer.from(html);
    }
    res.writeHead(response.status, { 'Content-Type': type, 'Cache-Control': 'no-store' }).end(body);
  } catch {
    res.writeHead(502).end();
  }
}).listen(4301, '127.0.0.1', () =>
  console.log('Audit-only fixtures: http://127.0.0.1:4301/es?audit=text-200 or audit=no-js'),
);
