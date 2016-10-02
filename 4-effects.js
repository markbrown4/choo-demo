const choo = require('choo')
const html = require('choo/html')
const http = require('choo/http')
const app = choo()

app.model({
  state: {
    items: []
  },
  effects: {
    fetchItems: (data, state, send, done) => {
      send('updateItems', [], done)
      http('/api/items.json', {json: true}, (err, res, body) => {
        send('updateItems', body.items, done)
      })
    }
  },
  reducers: {
    updateItems: (items, state) => ({ items: items })
  }
})

const itemView = (item) => html`<li>${item.name}</li>`

const myView = (state, prev, send) => html`
  <div onload=${() => send('fetchItems')}>
    <ul>
      ${state.items.map(item => itemView(item))}
    </ul>
  </div>
`

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
