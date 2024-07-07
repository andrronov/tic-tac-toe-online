import express from "express";
import expressWs from "express-ws";
import SocketClass from "./controllers/connection.controller.js";

const app = express();
const { app: wsApp, getWss } = expressWs(app);
const aWss = getWss()

app.ws('/', (ws, res) => {
   ws.on('message', (message) =>{
      const msg = JSON.parse(message)
      ws.user = msg.username

      switch (msg.method) {
         case 'connection':
            SocketClass.handleConnect(aWss, ws, msg, clients)
            break;

         case 'disconnection':

            break
      
         default:
            break;
      }
   })

  //  ws.on('close', () => {
  //     ws.send(JSON.stringify(clients))
  //     return clients = clients.filter(client => client !== ws.user);
  // });
})

app.listen('1234', () => console.log('App works on port 1234'));