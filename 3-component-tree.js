const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
  state: {
    title: '🚂 Choo!',
    items: [{
      name: 'Bob'
    }, {
      name: 'Shirley'
    }]
  },
  reducers: {
    updateTitle: (data, state) => {
      return { title: data }
    }
  }
})

const myItemView = (item, prev, send) => {
  function onClick(event) {
    event.preventDefault()

    send('updateTitle', item.name)
  }

  return html`
    <li>
      <span>Go ahead ${item.name},</span>
      <button onclick=${onClick}>make my day</button>
    </li>
  `
}

const myView = (state, prev, send) => {
  function onInput(event) {
    send('updateTitle', event.target.value)
  }

  return html`
    <div>
      <h1>Hello ${state.title}</h1>
      <p>It's a pleasure to meet you.</p>
      <label>May I ask your name?</label>
      <input value=${state.title} oninput=${onInput} />
      <ul>
        ${state.items.map(item => myItemView(item, prev, send))}
      </ul>
    </div>
  `
}

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
