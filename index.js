var express = require('express')

var app = express()
var port = process.env.PORT || 8081

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  res.send('UserId is: ' + req.params.id)
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

