const http = require('http');

// Gère les requêtes GET
const handleGetRequest = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const queryParam = Object.fromEntries(url.searchParams);

  response.writeHead(200, { 'Content-Type' : 'application/json' });
  response.end(JSON.stringify(queryParam));
}

// Gestionnaire des requêtes 
// (appelle la fonction adéquate pour le type de requête reçu)
function handleRequest(request, response) {
  const requestType = request.method; 

  switch (requestType) {
    case 'GET':
      handleGetRequest(request, response);
      break;

    case 'POST':
      response.end("J'ai reçu un POST")
      break;

    case 'PUT':
      response.end("J'ai reçu un PUT")
      break;

    case 'DELETE':
      response.end("J'ai reçu un DELETE")
      break;

    default:
      response.writeHead(404);
      response.end("Je ne gère pas ce type de requête");
      break;
  }
}

// Crée le serveur HTTP
const httpServer = http.createServer(handleRequest);

httpServer.listen(3030, () => {
  console.log("Server listening on port 3030");
})