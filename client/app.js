import ioClient from 'socket.io-client'

class App {
  constructor () {
    console.log('App created')
    this.nickname = prompt('What is your nickname?')
    this.io = ioClient('http://localhost:3000')
    this.users = {}
    this.users[this.nickname] = {
      cssClass: 'my-msg',
      nickname: this.nickname
    }
    this.wireEvents()
  }
  wireEvents () {
    console.log('wiring events')
    this.io.on('connect', (client) => {
      console.log(`ID: ${this.io.id} - Nickname: ${this.nickname}`) // 'G5p5...'
    })
    this.io.emit('user connected', this.nickname)
    this.io.on('chat message', (data) => {
      console.log('receiving message', this.users, data)
      this.addMessage(`${data.msg}`, this.users[data.nickname])
    })
    this.io.on('user connected', (data) => {
      console.log('adding user', data)
      if (!(data.nickname in this.users)) {
        this.users[data.newUser] = {
          nickname: data.newUser,
          cssClass: 'rand-msg'
        }
      }
      data.allUsers.forEach(u => {
        if (!(u in this.users)) {
          this.users[u] = {
            nickname: u,
            cssClass: 'rand-msg'
          }
        }
      })

      this.addMessage(`connected`, this.users[data.newUser])
    })
    this.io.on('disconnect', (e) => {
      console.log('disconnected', e)
    })
  }
  init () {
    console.log('App initializing')
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
      console.log('submitting msg', this, e)
      e.preventDefault()
      const messageInput = document.querySelector('#m')
      const msg = messageInput.value
      this.io.emit('chat message', {
        nickname: this.nickname,
        msg
      })
      this.addMessage(`${msg}`, this.users[this.nickname])
      return false
    })
  }
  addMessage (msg, user) {
    const messagesContainer = document.querySelector('#messages')
    const newMessage = document.createElement('li')
    newMessage.className = user.cssClass
    newMessage.innerHTML = `${user.nickname} - ${msg}`
    messagesContainer.appendChild(newMessage)
  }
}

export default App
