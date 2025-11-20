class SocketClass {
  constructor() {
    this.rooms = new Map();
  }

  handleConnect(aWss, ws, message) {
    ws.id = message.id;
    if (this.rooms.get(ws.id)?.length > 1) {
      return ws.send(JSON.stringify({ method: "abort", log: "Room is full" }));
    }

    if (!this.rooms.get(ws.id)) {
      this.rooms.set(ws.id, []);
    }
    this.rooms.get(ws.id).push(message.username);

    this.broadcastMessage(aWss, ws, {
      method: "connection",
      username: ws.user,
      clients: this.rooms.get(ws.id),
    });
  }

  handleDisconnect(aWss, ws) {
    const client = ws.user;
    let users = this.rooms.get(ws.id);

    let updatedUsers = [];
    if (users) {
      updatedUsers = users.filter((user) => user !== ws.user);
    }

    this.broadcastMessage(aWss, ws, {
      method: "disconnection",
      username: client,
      clients: updatedUsers,
    });

    if (updatedUsers.length < 1) {
      this.rooms.delete(ws.id);
    } else {
      this.rooms.set(ws.id, updatedUsers);
    }
  }

  broadcastMessage(aWss, ws, message) {
    aWss.clients.forEach((client) => {
      if (client.id === ws.id) client.send(JSON.stringify(message));
    });
  }

  getRooms(aWss, ws, message) {
    ws.send(
      JSON.stringify({
        method: "rooms",
        lobby: Array.from(this.rooms.entries()).map(([id, players]) => ({
          id,
          players,
        })),
      }),
    );
  }
}

export default new SocketClass();
