const http = require('http');
const url = require('url');

class HttpError extends Error {
  constructor(code, message = 'Uh oh, something went wrong.') {
    super(`${message} HTTP code ${code}`);
    this.code = code;
  }
}

const port = 8080;

const makes = require('./makes.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // all cors okay.
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  handleRequest(req, res);
});

async function handleRequest(req, res) {
  const urlParts = url.parse(req.url);

  try {
    switch (urlParts.pathname) {
      case '/api/makes':
        handleGet(req, res, makes);
        break;
      default:
        throw new HttpError(404);
    }
  } catch (ex) {
    console.error(ex);

    res.writeHead(ex.code || 500);
    res.write(ex.message);
    res.end();
  }
}

function handleGet(req, res, data, filters) {
  if (req.method !== 'GET') {
    throw new HttpError(405);
  }

  let filteredData = data;
  if (filters) {
    filteredData = filterData(req, data, filters);

    if(data === models) {
      filteredData = filteredData.map(({make, model}) => model);
    }
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(filteredData, 0, 2));
  res.end();
}

server.listen(port, function () {
  console.log("Server listening on: http://localhost:%s", port);
});
