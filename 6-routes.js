const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
  state: {
    items: [{
      id: 'sue',
      to: 'sue@gmail.com',
      subject: 'Check out Choo Sue'
    }, {
      id: 'borris',
      to: 'borris@gmail.com',
      subject: 'Hey Borris, have you heard of Choo?'
    }]
  }
})

const homeView = (state, prev, send) => html`
  <div>
    <h1>Welcome</h1>
    <p>Check out your <a href="/inbox">Inbox</a></p>
  </div>
`

const navView = (state) => {
  return html`
  <div>
    <h1>Inbox</h1>
    <ul>
      <li class="${state.location.pathname.includes('/home') ? 'active' : ''}"><a href="/home">Home</a></li>
      <li class="${state.location.pathname.includes('/inbox' ? 'active' : '')}"><a href="/inbox">Inbox</a></li>
    </ul>
  </div>
`
}

const itemView = (mail) => html`
  <li>
    <a href="/inbox/${mail.id}">
      <span>${mail.to}</span>
      <strong>${mail.subject}</strong>
    </a>
  </li>
`

const inboxView = (state, prev, send) => html`
  <div>
    ${navView(state)}
    <ul>
      ${state.items.map(email => itemView(email))}
    </ul>
  </div>
`

const mailView = (state, prev, send) => {
  const email = state.items.find(item => item.id == state.params.id)
  return html`
    <div>
      ${navView(state)}
      <h2>${email.subject}</h2>
      <p>${email.to}</p>
    </div>
  `
}

app.router(route => [
  route('/', homeView),
  route('/inbox', inboxView, [
    route('/:id', mailView),
  ])
])

const tree = app.start()
document.body.appendChild(tree)
