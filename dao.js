const uuidv4 = require('uuid/v4');

var jobs = [
    {
        'id': '1',
        'startingLocation': {
            'lat': 47.606581,
            'long': -122.336453
        },
        'destinationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.52,
        'status': 'AVAILABLE',
        'owner': 'Ofo',
        'worker:': null
    },
    {
        'id': '2',
        'startingLocation': {
            'lat': 47.620133,
            'long': -122.349436
        },
        'destinationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.24,
        'status': 'AVAILABLE',
        'owner': 'Lime',
        'worker:': null
    },
    {
        'id': '3',
        'startingLocation': {
            'lat': 47.620133,
            'long': -122.349436
        },
        'destinationLocation': {
            'lat': 47.611634,
            'long': -122.349441
        },
        'reward': 1.99,
        'status': 'TAKEN'
    }
]

module.exports = {

    addjob(startingLocation, destinationlocation, reward, status, owner, worker) {
        newJobDefinition = 
        {
            'id': uuidv4(),
            'startingLocation': startingLocation,
            'destinationLocation': destinationlocation,
            'reward': reward,
            'status': status,
            'owner': owner,
            'worker:': worker
        }

        jobs.push(newJobDefinition)

        return newJobDefinition.id
    },

    updatejob(targetJobId, startingLocation, destinationLocation, reward, status, owner, worker) {
        job = this.getjob(targetJobId)
        if (job) {
            if (startingLocation) {
                job.startingLocation = startingLocation
            }
            if (destinationLocation) {
                job.destinationLocation = destinationLocation
            }
            if (reward) {
                job.reward = reward
            }
            if (status) {
                job.status = status
            }
            if (owner) {
                job.owner = owner
            }
            if (worker) {
                job.worker = worker
            }
        }
    },

    getJobs() {
        return jobs
    },

    getAvailableJobs() {
        return this.getJobs().filter(job => job.status == 'AVAILABLE')  
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

    populateExampleJobs() {
        this.addjob(
            {
                'lat': 47.606581,
                'long': -122.336453
            },
            {
                'lat': 47.611634,
                'long': -122.349441
            },
            12,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.620133,
                'long': -122.349436
            },
            {
                'lat': 47.611634,
                'long': -122.349441
            },
            1.24,
            'AVAILABLE',
            'Lime',
            null
        )
    }
}