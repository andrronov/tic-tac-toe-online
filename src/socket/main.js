const socket = new WebSocket('ws://localhost:1234')
socket.onopen = () => {
   socket.send(JSON.stringify({
      method: 'connection',
      id: null,
      username: null
   }))
}
socket.onmessage = (event) => {
   console.log('msg from server', event.data);
}

export default socket