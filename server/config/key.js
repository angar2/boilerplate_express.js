if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod') // Deploy(heroku)
} else {
    module.exports = require('./dev') // local
}