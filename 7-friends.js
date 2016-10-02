const choo = require('choo')
const html = require('choo/html')
const d3 = require('d3')
const app = choo()

app.model({
  state: {
    time: new Date().getTime()
  },
  reducers: {
    updateTime: (data, state) => ({
      time: new Date().getTime()
    })
  },
  subscriptions: [
    (send, done) => {
      setInterval(() => {
        send('updateTime', null, done)
      }, 1000)
    }
  ]
})

const timeView = (state, prev, send) => html`
  <p>${state.time}</p>
`

const dataVizBiz = (state, prev, send) => {
  function load(el) {
    d3.select(el)
      .selectAll('div')
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append('div')
      .style('display', 'inline-block')
      .style('height', (d)=> d + 'px')
      .style('width', '20px')
      .style('margin', '0 2px')
      .style('background', 'deepskyblue')
  }

  return html`
    <div>
      <div onload=${load}></div>
      ${timeView(state, prev, send)}
    </div>
  `
}

const myView = (state, prev, send) => html`
  <div>
    <h1>Sharing is caring</h1>
    ${timeView(state, prev, send)}
    ${dataVizBiz(state, prev, send)}
  </div>
`

app.router(route => [
  route('/', myView)
])

const tree = app.start()
document.body.appendChild(tree)
