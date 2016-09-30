const choo = require('choo')
const html = require('choo/html')
const http = require('choo/http')
const app = choo()

const keyMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

app.model({
  state: {
    pressedKeys: {
      left: false,
      up: false,
      right: false,
      down: false
    }
  },
  subscriptions: [
    (send, done) => {
      function keyChange(keyCode, value) {
        const key = keyMap[keyCode]
        if (!key) return

        const patch = {}
        patch[key] = value
        send('updatePressedKeys', patch, done)
      }
      window.addEventListener('keydown', (event) => {
        keyChange(event.keyCode, true)
      }, false)
      window.addEventListener('keyup', (event) => {
        keyChange(event.keyCode, false)
      }, false)
    }
  ],
  reducers: {
    updatePressedKeys: (patch, state) => ({
      pressedKeys: Object.assign(state.pressedKeys, patch)
    })
  }
})

const myView = (state, prev, send) => html`
  <div>
    ${JSON.stringify(state.pressedKeys)}
  </div>
`

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
