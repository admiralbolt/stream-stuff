var WebSocket = require('ws');

// Define all sockets below, don't forget the port number!
var brain = new WebSocket.Server({port: 7003});
var canvas = new WebSocket.Server({port: 7004});
var king = new WebSocket.Server({port: 7007});
var melee = new WebSocket.Server({port: 7000});
var poll = new WebSocket.Server({port: 7005});
var splash = new WebSocket.Server({port: 7002});
var spotify = new WebSocket.Server({port: 7001});
var sub_goal = new WebSocket.Server({port: 7006});

var servers = [brain, canvas, king, melee, poll, splash, spotify, sub_goal];

servers.forEach(server => {
  server.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          // console.log(data);
          client.send(data);
        }
      });
    });
  });
});
