import ioClient from 'socket.io-client'

class App {
  constructor() {
    console.log('App created');
    this.nickname = prompt('What is your nickname?');
    this.io = ioClient('http://localhost:3000');
    this.wireEvents();
  }
  wireEvents() {
    console.log('wiring events');
    this.io.on('connect', (client) => {
      console.log(`ID: ${this.io.id} - Nickname: ${this.nickname}`); // 'G5p5...'
    });
    this.io.emit('user connected', this.nickname);
    this.io.on('chat message', (data) => {
      this.addMessage(`${data.nickname}: ${data.msg}`);
    });
    this.io.on('user connected', (data) => {
      this.addMessage(`${data} connected`);
    });
    this.io.on('disconnect', (e) => {
      console.log('disconnected', e);
    });
  }
  init() {
    console.log('App initializing');
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      console.log('submitting msg', this, e);
      e.preventDefault();
      const messageInput = document.querySelector('#m');
      const msg = messageInput.value;
      this.io.emit('chat message', {
        nickname: this.nickname,
        msg
      });
      this.addMessage(`Me: ${msg}`);
      return false;
    });
  }
  addMessage(msg) {
    const messagesContainer = document.querySelector('#messages');
    const newMessage = document.createElement("li");
    newMessage.innerHTML = msg;
    messagesContainer.appendChild(newMessage);
  }
}

export default App;