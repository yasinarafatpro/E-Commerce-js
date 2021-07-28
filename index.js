const express = require('express')
const app = express()

app.get('/hi', (req, res) => {
  return res.send('yes no')
})

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
