var express = require('express')
var path = require('path') 
var dao = require('./dao.js')
dao.populateExampleJobs()

var app = express()
var port = process.env.PORT || 8081

var cors = require('cors'); 
app.use(cors());
app.use(express.json());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/restart', function(req, res, next) {
  dao.populateExampleJobs()
  res.status(200).send('OK')
});

app.get('/user/:id', function (req, res, next) {
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

app.post('/job', function(req, res, next) {
  newJobParameters = req.body

  newJobId = dao.addjob(
    newJobParameters.startingLocation, 
    newJobParameters.destinationLocation, 
    newJobParameters.reward, 
    newJobParameters.status, 
    newJobParameters.owner, 
    newJobParameters.worker
  )

  if (newJobId) {
    res.send(newJobId)
  } else {
    res.status(500).send('Internal Service Error')
  }
})

app.patch('/job/:jobId', function(req, res, next) {
  console.log('/job/:jobId POST| request body')
  console.dir(req.body)

  updatedJobParameters = req.body

  dao.updatejob(
    req.params.jobId, 
    updatedJobParameters.startingLocation, 
    updatedJobParameters.destinationLocation, 
    updatedJobParameters.reward, 
    updatedJobParameters.status, 
    updatedJobParameters.owner, 
    updatedJobParameters.worker
  )
  res.send(req.body)
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

