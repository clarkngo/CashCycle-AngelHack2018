var express = require('express')
var dao = require('./dao.js')

var app = express()
var port = process.env.PORT || 8081

var cors = require('cors'); 
app.use(cors());

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  res.send('UserId is: ' + req.params.id)
})

app.get('/job/', function(req, res, next) {
  res.send(dao.getAvailableJobs())
})

app.get('/job/:jobId', function(req, res, next) {
  requestedJobId = req.params.jobId
  console.log('/job/:jobId , requestedJobId: ' + requestedJobId)
  job = dao.getjob(requestedJobId)
  if (job) {
    res.send(job)
  } else {
    res.status(404).send('Not Found')
  }
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

