var WebSocket = require('ws');

// Define all sockets below, don't forget the port number!
var melee = new WebSocket.Server({port: 7000});

melee.on('connection', function connection(ws) {
 ws.on('message', function incoming(data) {
    melee.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
