const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express()

const postsRoutes = require('./routes/posts')

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(bodyParser());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    User.findById('5d11f6b3bc173874f4ad0941')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err))
  })
  app.use(postsRoutes)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  mongoConnect(() => {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  });

}
start()
