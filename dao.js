
var jobs = [
    {
        'id': '1',
        'startingLocation': {
            'lat': 47.606581,
            'long': -122.336453
        },
        'destingationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.52,
        'status': 'AVAILABLE'
    },
    {
        'id': '2',
        'startingLocation': {
            'lat': 47.620133,
            'long': -122.349436
        },
        'destingationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.24,
        'status': 'AVAILABLE'
    },
    {
        'id': '3',
        'startingLocation': {
            'lat': 47.620133,
            'long': -122.349436
        },
        'destingationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.99,
        'status': 'TAKEN'
    }
]

module.exports = {

    addjob(startingLocation, destinationlocation, reward, status) {
        
    },

    getjobs() {
        return jobs
    },

    getAvailableJobs() {
        return this.getjobs().filter(job => job.status == 'AVAILABLE')  
      },

    getjob(targetJobId) {
        console.log("dao.getjob | targetJobId: " + targetJobId)
        for (var i = 0; i < jobs.length; i++) {
            job = jobs[i]
            console.log('comparing job: ' + job.id + job.startingLocation)
            if (job['id'] == targetJobId) {
                return job
            }
        }
        return null
    },

    updateJob(targetJobId, newJobDefinitoin) {

    }
}