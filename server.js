const express = require('express')
var app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())

//sql database connection
require('./connectDB')

//routes path
app.get('/', (req, res) => {
  res.send('server active')
})

require('./usersRoutes')(app) // employees routes
require('./productRoutes')(app) // product routes

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server is running on port: ' + port))
