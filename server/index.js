import express from "express";
import expressWs from "express-ws";
import SocketClass from "./controllers/connection.controller.js";

const app = express();
const { app: wsApp, getWss } = expressWs(app);
const aWss = getWss()

app.ws('/', (ws, res) => {
   ws.send('youre connected successfully')
   ws.on('message', (message) =>{
      const msg = JSON.parse(message)
      switch (msg.method) {
         case 'connection':
            SocketClass.handleConnect(aWss, ws, msg)
            break;
      
         default:
            break;
      }
   })
})

app.listen('1234', () => console.log('App works on port 1234'));