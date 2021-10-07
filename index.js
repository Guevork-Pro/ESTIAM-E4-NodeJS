const http = require('http');

const vehicles = [
  {
    id: 1,
    type: "car",
    brand: "Lambo",
    model: "Aventador",
    color: "Jaune",
    year: 2020
  },
  {
    id: 2,
    type: "bike",
    brand: "Estiam",
    model: "double",
    color: "red",
    year: 2010
  }
];

const createVehicle = (type, { brand, model, color, year }) => {  
  if(!brand || !model || !color || !year) {
    return undefined;
  }

  return {
    id: vehicles.length + 1,
    type,
    brand,
    model,
    color,
    year
  }
}

// Gère les requêtes GET
const handleGetRequest = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;

  if(pathname === "/") {
    response.end(
      "GET: /,\nGET: /vehicles,\nGET: /vehicles/:type,\nGET: /vehicles/:type/:id,\nPOST: /vehicles/:type,\nPUT: /vehicles/:type,\nDELETE: /vehicles/:type/:id"
    );
    return;
  }
  else if (pathname.startsWith("/vehicles")) {
    const pathnameParts = pathname.split("/");

    const getAllVehicles = pathnameParts.length === 2;
    const getVehiclesFromType = pathnameParts.length === 3;
    const getVehiclesFromTypeAndId = pathnameParts.length === 4;

    response.writeHead(200, { 'Content-Type' : 'application/json' });

    if (getAllVehicles) {
      response.end(
        JSON.stringify({ vehicles })
      );
      return;
    }
    else if(getVehiclesFromType) {
      const vehicleType = pathnameParts[2];
      const filteredVehicles = vehicles.filter(
        ({ type }) => type === vehicleType        
      );
      response.end(JSON.stringify({ vehicles: filteredVehicles }));
      return;
    }
    else if(getVehiclesFromTypeAndId) {
      const vehicleType = pathnameParts[2];
      const vehicleId = Number(pathnameParts[3]);
      const filteredVehicles = vehicles.filter(
        ({ id, type }) => type === vehicleType && id === vehicleId
      );
      response.end(JSON.stringify(filteredVehicles[0]));
      return;
    }
  }

  response.writeHead(404);
  response.end("Not found");
}

// Gère les requêtes POST
const handlePostRequest = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;

  const pathnameParts = pathname.split("/");
 
  if(pathname.startsWith("/vehicles") && pathnameParts.length === 3) {
    let data = "";
    request.on('data', (chunk) => {
      data += chunk.toString();
    });

    request.on('end', () => {
      const vehicleType = pathnameParts[2];
      const newVehicle = createVehicle(vehicleType, JSON.parse(data));
      if(newVehicle) {
        vehicles.push(newVehicle);

        response.writeHead(201, { 'Content-Type' : 'application/json' }); 
        response.end(JSON.stringify(newVehicle));
      } else {
        response.writeHead(400);
        response.end("Bad request");
      }
    });
    return;
  }
  response.end("J'ai reçu un POST")
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
      handlePostRequest(request, response);
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