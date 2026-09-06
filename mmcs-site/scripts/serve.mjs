// Local preview of the production static export. Not an application backend.
import { createServer } from 'node:http';
import { createReadStream, statSync, existsSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
if (!existsSync(root)) {
  console.error('Run npm run build before npm start.');
  process.exit(1);
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const server = createServer((request, response) => {
  try {
    const path = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname,
    );
    let file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = resolve(file, 'index.html');
    if (!existsSync(file)) {
      response.statusCode = 404;
      file = resolve(root, '404.html');
    }
    response.setHeader(
      'Content-Type',
      types[extname(file)] ?? 'application/octet-stream',
    );
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    if (request.method !== 'GET') {
      response.writeHead(405).end();
      return;
    }
    createReadStream(file)
      .on('error', () => response.destroy())
      .pipe(response);
  } catch {
    response.writeHead(400).end('Bad request');
  }
});
server.listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () =>
  console.log(`Static preview: http://127.0.0.1:${process.env.PORT ?? 4173}`),
);
