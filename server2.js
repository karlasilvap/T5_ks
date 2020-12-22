const http = require('http');
const fs = require('fs');
const path = require('path'); // incorporado en Node por defecto

require('dotenv').config();

const root = process.env.ROOT_FILE;

const port = process.env.PORT;

/*
Este servidor responde entregando el archivo que se encuentra en la ruta
especificada. En caso de que el archivo no exista, retorna una respuesta de
estado 404 (Not Found).
*/
const server = http.createServer(async function (req, res) {
  try {
    const file = await readFile(req.url);
    res.writeHead(200);
    res.write(file);
  } catch (error) {
    res.writeHead(404);
    res.write('Error: requested file not found.');
  }
  res.end();
});

/* Lee un archivo que se encuentra en la ruta especificada. En caso de que esta
sea "/" retorna el archivo root */
async function readFile(url) {
  if (url === '/') {
    url = '/' + root;
  }
  console.log(path.normalize(__dirname + url));
  return fs.readFileSync(path.normalize(__dirname + url));
}

server.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
