const express = require('express');
const app = express();
const port = 3000;
const vehicles = require('./vehicles.json');

let nextId = 3;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (request, response) => {
  response.send("Racine");
});

app.get('/vehicles', (request, response) => {
  response.send(vehicles);
});

app.get('/vehicles/:typeVehicle', (request, response) => {
  const typeVehicle = request.params.typeVehicle;
  const filterByType = (vehicle) => {
    return vehicle.type === typeVehicle;
  }
  const vehiclesFilteredByType = vehicles.filter(filterByType);
  response.send(vehiclesFilteredByType);
});

app.get('/vehicles/:typeVehicle/:id', (request, response) => {
  const typeVehicle = request.params.typeVehicle;
  const idVehicle = Number(request.params.id);

  const vehiclesFilteredByTypeAndId = vehicles.filter(
    (vehicle) => {
      return vehicle.type === typeVehicle && vehicle.id === idVehicle;
    }
  );
  response.send(vehiclesFilteredByTypeAndId);
});

app.use('/vehicles/:typeVehicle', (request, response, next) => {
  if(request.method === "POST") {
    if(Object.values(request.body).length === 0) {
      response.sendStatus(400);
      return;
    }
    else if (!request.body.brand || !request.body.model || !request.body.color || !request.body.year) {
      response.sendStatus(400);
      return;
    }
  }
  next();
})

app.post('/vehicles/:typeVehicle', (request, response) => {
  const typeVehicle = request.params.typeVehicle;

  const newVehicle = {
    id: nextId,
    type: typeVehicle,
    ...request.body
  };

  nextId++;

  vehicles.push(newVehicle);
  response.send(newVehicle);
})

app.listen(port, () => {
  console.log(`Server started on port 3000`);
})