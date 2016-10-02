const choo = require('choo')
const html = require('choo/html')
const d3 = require('d3')
const app = choo()

app.model({
  state: {
    time: new Date().getTime()
  },
  reducers: {
    update: (data, state) => ({
      time: new Date().getTime()
    })
  },
  subscriptions: [
    (send, done) => {
      setInterval(() => {
        send('update', null, done)
      }, 1000)
    }
  ]
})

const timeView = (state, prev, send) => html`
  <p>${state.time}</p>
`

const untouchable = (state, prev, send) => {
  function load(el) {
    el.innerHTML = 'Untouched';
  }

  let component = html`
    <div onload=${load}></div>
  `
  component.isSameNode = () => true

  return component;
}

const myView = (state, prev, send) => html`
  <div>
    <h1>Sharing is caring</h1>
    ${timeView(state, prev, send)}
    ${untouchable(state, prev, send)}
    ${timeView(state, prev, send)}
  </div>
`

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
