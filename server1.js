const http = require('http'); // incorporado en Node por defecto
const fs = require('fs'); // incorporado en Node por defecto

require('dotenv').config(); // npm install dotenv

const root = process.env.ROOT_FILE;
const host = process.env.HOST;
const port = process.env.PORT;

/* Este servidor responde a cualquier ruta con el mismo archivo root */
const server = http.createServer(async function (req, res) {
  const file = await readFile(root);
  
  res.writeHead(200); // escribimos el codigo de estado de la respuesta
  res.write(file); // escribimos la respuesta misma, que es un archivo
  res.end(); // terminamos la respuesta
});

/* Esta función lee un archivo que se encuentra en el path especificado */
async function readFile(path) {
  const file = fs.readFileSync(path);
  return file;
}

server.listen(port, host, () => {
  console.log(`server listening at http://${host}:${port}`);
});
