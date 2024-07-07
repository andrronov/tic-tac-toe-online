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

         case 'disconnection':
            break
      
         default:
            break;
      }
   })
   
   ws.on('close', () => {
    console.log('disconnected');
    SocketClass.handleDisconnect(aWss, ws)
  });
})

app.listen('1234', () => console.log('App works on port 1234'));