import express from "express";
import expressWs from "express-ws";
import SocketClass from "./controllers/connection.controller.js";

const PORT = process.env.PORT || 5172;
const app = express();
const { app: wsApp, getWss } = expressWs(app);
const aWss = getWss();

app.use(express.static("dist"));

app.ws("/", (ws, res) => {
  ws.alive = true;
  ws.on("message", (message) => {
    if (message === "ping") {
      ws.alive = true;
      ws.send("pong");
      return;
    }

    const msg = JSON.parse(message);
    ws.user = msg.username;

    switch (msg.method) {
      case "connection":
        console.log("[SERVER]: Connection ", msg);
        SocketClass.handleConnect(aWss, ws, msg);
        break;

      case "move":
        SocketClass.broadcastMessage(aWss, ws, msg);
        break;

      case "rooms":
        console.log("[SERVER]: Rooms ", msg);
        SocketClass.getRooms(aWss, ws, msg);
        break;

      case "leave":
        SocketClass.handleDisconnect(aWss, ws);
        break;

      default:
        break;
    }
  });

  ws.on("close", () => {
    SocketClass.handleDisconnect(aWss, ws);
  });
});

setInterval(() => {
  aWss.clients.forEach((ws) => {
    if (ws.alive === false) {
      SocketClass.handleDisconnect(aWss, ws);
      return ws.terminate();
    }
    ws.alive = false;
    ws.ping();
  });
}, 20000);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
