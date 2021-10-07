const http = require('http');

function handleRequest(request, response) {
  
}

const httpServer = http.createServer(handleRequest);

httpServer.listen(3030, () => {
  console.log("Server listening on port 3030");
})