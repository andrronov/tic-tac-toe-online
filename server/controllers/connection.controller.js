class SocketClass{
   constructor(users){
      this.users = []
   }

   handleConnect(aWss, ws, message){
      ws.id = message.id
      this.users.push(message.username)
      message.clients = this.users
      this.broadcastConnection(aWss, ws, message)
   }
   handleDisconnect(aWss, ws){
      const client = this.users.find(user => user == ws.user)
      this.users = this.users.filter(user => user !== ws.user)
      const message = {
         method: 'disconnection',
         username: client,
         clients: this.users
      }
      this.broadcastDisconnection(aWss, ws, message)
   }

   broadcastConnection(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === message.id) client.send(JSON.stringify(message))
      })
   }
   broadcastDisconnection(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === ws.id) client.send(JSON.stringify(message))
      })
   }
}

export default new SocketClass();