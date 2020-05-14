var WebSocket = require('ws');

// Define all sockets below, don't forget the port number!
var melee = new WebSocket.Server({port: 7000});
var spotify = new WebSocket.Server({port: 7001});

var servers = [melee, spotify];

servers.forEach(server => {
  server.on('connection', function connection(ws) {
   ws.on('message', function incoming(data) {
      server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
});
