const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT || 3000);
const publicFiles = new Map([
    ['/', ['index.html', 'text/html; charset=utf-8']],
    ['/index.html', ['index.html', 'text/html; charset=utf-8']],
    ['/agri_text_sms_simulator.html', ['agri_text_sms_simulator.html', 'text/html; charset=utf-8']],
    ['/agri_text_sms_simulator.js', ['agri_text_sms_simulator.js', 'text/javascript; charset=utf-8']]
]);
const publicDirectory = __dirname;

const server = http.createServer((request, response) => {
    let pathname;
    try {
        pathname = new URL(request.url, 'http://localhost').pathname;
    } catch (error) {
        response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Bad request');
        return;
    }

    if (pathname === '/health' || pathname === '/healthz') {
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
        });
        response.end(JSON.stringify({ status: 'ok' }));
        return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, {
            'Allow': 'GET, HEAD',
            'Content-Type': 'text/plain; charset=utf-8'
        });
        response.end('Method not allowed');
        return;
    }

    const file = publicFiles.get(pathname);
    if (!file) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
    }

    const [fileName, contentType] = file;
    const filePath = path.join(publicDirectory, fileName);
    fs.readFile(filePath, (error, contents) => {
        if (error) {
            console.error(`Failed to read ${fileName}:`, error);
            if (!response.headersSent) {
                response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            }
            response.end('Internal server error');
            return;
        }

        response.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': contents.length,
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-cache'
        });
        response.end(request.method === 'HEAD' ? undefined : contents);
    });
});

server.on('error', (error) => {
    console.error('HTTP server error:', error);
    process.exitCode = 1;
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Agri Text server listening on port ${port}`);
});
