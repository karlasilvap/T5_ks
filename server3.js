const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring'); // npm install querystring

require('dotenv').config();

const root = process.env.ROOT_FILE;
const host = process.env.HOST;
const port = process.env.PORT;

/* 
Este servidor responde a cualquier ruta, pero hace diferencias en el tipo de request.
Si el método es GET, entonces responderá con el archivo root. Y si es POST, responderá
con el archivo indicado en el body de la request.
*/
const server = http.createServer(async function (req, response) {
  if (req.method === 'GET') {
    const file = await readFile(root);
    response.writeHead(200);
    response.write(file);
    response.end();
  } else if (req.method === 'POST') {
    // Tenemos que leer el body de la request, concatenando un buffer de datos recibido
    const chunks = [];
    
    req.on('data', async chunk => chunks.push(chunk));
    
    req.on('end', async () => {
      const data = Buffer.concat(chunks).toString();
      const { filename } = qs.parse(data);
      try {
        const file = await readFile(filename);
        response.writeHead(200);
        response.write(file);
      } catch (error) {
        response.writeHead(404);
        response.write('Error: requested file not found.');
      }
      response.end();
    });
  }
});

async function readFile(filePath) {
  const normalizedPath = path.normalize(path.join(__dirname, filePath)); 
  console.log(normalizedPath);
  return fs.readFileSync(normalizedPath);
}

server.listen(port, host, () => {
  console.log(`server listening at http://${host}:${port}`);
});
