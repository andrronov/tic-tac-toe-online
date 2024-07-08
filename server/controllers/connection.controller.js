class SocketClass{
   constructor(){
      this.rooms = new Map()
   }

   handleConnect(aWss, ws, message){
      ws.id = message.id
      if(this.rooms.get(ws.id)?.length > 1){
         return ws.send(JSON.stringify({method: 'abort', log: 'Room is full'}))
      }
      if(!this.rooms.get(ws.id)){
         this.rooms.set(ws.id, [])
      }
      this.rooms.get(ws.id).push(message.username)
      const messageAPI = {
         method: 'connection',
         username: ws.user,
         clients: this.rooms.get(ws.id)
      }
      this.broadcastConnection(aWss, ws, messageAPI)
   }
   handleDisconnect(aWss, ws){
      const client = ws.user
      const users = this.rooms.get(ws.id)
      if(users?.length < 1) return this.rooms.delete(ws.id)
      this.rooms.set(ws.id, users?.filter(user => user !== ws.user))
      const message = {
         method: 'disconnection',
         username: client,
         clients: this.rooms.get(ws.id)
      }
      this.broadcastDisconnection(aWss, ws, message)
   }

   broadcastConnection(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === ws.id) client.send(JSON.stringify(message))
      })
   }
   broadcastDisconnection(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === ws.id) client.send(JSON.stringify(message))
      })
   }

   broadcastUserMove(aWss, ws, message){
      aWss.clients.forEach(client => {
         if(client.id === ws.id) client.send(JSON.stringify(message))
      })
   }

   getRooms(aWss, ws, message){
      ws.send(JSON.stringify({
         method: 'rooms',
         lobby: Object.fromEntries(this.rooms.entries())
      }))
   }
}

export default new SocketClass();