// Phusion Passenger entry point used by cPanel "Setup Node.js App".
// Passenger sets process.env.PORT and listens on it automatically.
// We just have to spin up the Next.js request handler.

const { createServer } = require('http')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch(err => {
        console.error('Request handler error:', err)
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }).listen(port, () => {
      console.log(`> Souk El Bey ready on http://${hostname}:${port}`)
    })
  })
  .catch(err => {
    console.error('Next.js failed to start:', err)
    process.exit(1)
  })
