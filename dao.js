
var jobs = [
    {
        'id': '1',
        'startingLocation': {
            'lat': 0,
            'long': 0
        },
        'destingationLocation': {
            'lat': 1,
            'long': 1
        },
        'reward': 1.52,
        'status': 'AVAILABLE'
    },
    {
        'id': '2',
        'startingLocation': {
            'lat': 2,
            'long': 2
        },
        'destingationLocation': {
            'lat': 4,
            'long': 4
        },
        'reward': 1.52,
        'status': 'AVAILABLE'
    }
]

module.exports = {

    addjob(startingLocation, destinationlocation, reward, status) {
        
    },

    getjobs() {
        return jobs
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
    }
}