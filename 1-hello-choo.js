const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
  state: {
    title: '🚂 Choo!'
  }
})

const myView = (state, prev, send) => html`
  <div>
    <h1>Hello ${state.title}</h1>
  </div>
`

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
