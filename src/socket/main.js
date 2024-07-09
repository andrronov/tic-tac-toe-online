const socket = new WebSocket('wss://tic-tac-toe-uusw.onrender.com')
// socket.onopen = () => {
//    socket.send(JSON.stringify({
//       method: 'connection',
//       id: null,
//       username: null
//    }))
// }
// socket.onmessage = (event) => {
//    console.log('msg from server', event.data);
// }

export default socket