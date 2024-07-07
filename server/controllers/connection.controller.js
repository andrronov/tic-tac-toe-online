class SocketClass{
   constructor(users){
      this.users = []
   }

   handleConnect(aWss, ws, message, clients){
      ws.id = message.id
      this.users.push(message.username)
      message.clients = this.users
      this.broadcastConnection(aWss, ws, message)
   }

   broadcastConnection(aWss, ws, message, clients){
      aWss.clients.forEach(client => {
         if(client.id === message.id) client.send(JSON.stringify(message))
      })
   }
   broadcastDisconnection(aWss, ws, message, clients){
      aWss.clients.forEach(client => {

      })
   }
}

export default new SocketClass();