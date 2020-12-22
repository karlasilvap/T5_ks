const express = require('express'); // npm install express
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const root = process.env.ROOT_FILE;
const host = process.env.HOST;
const port = process.env.PORT;

/*
Este es el mismo servidor que server3, pero usando ExpressJS :D
*/
const app = express(port);

/* Este es un middleware que decodifica los bodies de las requests enviadas por el browser */
app.use(express.urlencoded());

/* Este es un middleware que decodifica los bodies de las requests enviadas en formato JSON
(como cuando usamos fetch) */
// app.use(express.json());

app.get('/', async (req, res) => {
  const file = await readFile(root);
  res.writeHead(200);
  res.write(file);
  res.end();
});

app.post('/', async (req, res) => {
  const { filename } = req.body;
  try {
    const file = await readFile(filename);
    res.writeHead(200);
    res.write(file);
  } catch (error) {
    res.writeHead(404);
    res.write('Error: requested file not found');
  }
  res.end();
});

async function readFile(filePath) {
  const normalizedPath = path.normalize(path.join(__dirname, filePath));
  console.log(normalizedPath);
  return fs.readFileSync(normalizedPath);
}

app.listen(port, host, () => {
  console.log(`app listening at http://${host}:${port}`);
});
