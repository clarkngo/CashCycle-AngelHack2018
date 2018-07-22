const uuidv4 = require('uuid/v4');

var jobs = [];

module.exports = {

    addjob(startingLocation, destinationlocation, reward, status, owner, worker) {
        newJobDefinition = 
        {
            'id': uuidv4(),
            'startingLocation': startingLocation,
            'destinationLocation': destinationlocation,
            'distance': Math.round(1.4 * 110000 * Math.sqrt(Math.pow((startingLocation.lat - destinationlocation.lat),2) + Math.pow(startingLocation.long - destinationlocation.long,2))),
            'reward': reward,
            'status': status,
            'owner': owner,
            'worker': worker
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

        jobs = [
            {
                'id': '1',
                'startingLocation': {
                    'lat': 47.619780,
                    'long': -122.346432
                },
                'destinationLocation': {
                    'lat': 47.620467,
                    'long': -122.349254
                },
                'reward': 1.52,
                'status': 'AVAILABLE',
                'owner': 'OFO',
                'worker': null,
                'distance': 620
            }
        ]
        
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
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.609629,
                'long': -122.326863
            },
            {
                'lat': 47.602717,
                'long': -122.337964
            },
            1.00,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.615370,
                'long': -122.326817
            },
            {
                'lat': 47.616243,
                'long': -122.354746
            },
            2.00,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.640220,
                'long': -122.305819
            },
            {
                'lat': 47.628774,
                'long': -122.314631
            },
            0.70,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.630214,
                'long': -122.320235
            },
            {
                'lat': 47.628717,
                'long': -122.314463
            },
            0.70,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.624494,
                'long': -122.346462
            },
            {
                'lat': 47.616498,
                'long': -122.353833
            },
            3.00,
            'AVAILABLE',
            'OFO',
            null
        )

        this.addjob(
            {
                'lat': 47.617231,
                'long': -122.343203
            },
            {
                'lat': 47.616498,
                'long': -122.353833
            },
            1.95,
            'AVAILABLE',
            'OFO',
            null
        )
    }
}