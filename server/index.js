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
            SocketClass.handleConnect(aWss, ws, msg)
            break;

         case 'move':
            SocketClass.broadcastUserMove(aWss, ws, msg)
            break

        case 'rooms':
            SocketClass.getRooms(aWss, ws, msg)
            break;
      
         default:
            break;
      }
   })
   
   ws.on('close', () => {
    SocketClass.handleDisconnect(aWss, ws)
  });
})

app.listen('1234', () => console.log('App works on port 1234'));