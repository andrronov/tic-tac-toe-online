class SocketClass{
   handleConnect(aWss, ws, message){
      ws.id = message.id
      this.broadcastConnection(aWss, ws, message)
   }

   broadcastConnection(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === message.id) client.send(`User ${message.username} connected`)
      })
   }
}

export default new SocketClass();