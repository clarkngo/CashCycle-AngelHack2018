# How my team rocked the AngelHack Seattle Hackathon

https://www.freecodecamp.org/news/ghost/#/editor/post/5ceb785fe17b4228e0185bb7

This was my second time participating in a Hackathon, and it was a truly enriching experience! We were able to call APIs, connect to the back-end database, and build most of the app’s front-end logic and functionalities using JavaScript.

I participated in the Capital One DevExchange Hackathon earlier this year with little to no coding experience. It helped me manage my own expectations and gain an idea what the judges were expecting.

## The Judging Criteria
- good pitch
- working demo
- impact on society
- scalability

## What Helped
- Attending the City University of Seattle for a Master of Science program in Computer Science.
- Online coding resources (like freeCodeCamp and Udemy)
- Going to meetups (check out Meetup.com)
- Medium
- A lot of great mentors.
- Awesome team members!

## The App
We developed a solution to solve a common problem: share bikes being left in unsuitable places. This creates problems for the environment, and bike-sharing companies incur extra costs and penalties. Our solution crowdsources workers to help move share bikes to appropriate locations, which decreases clutter and benefits both the community and bike share companies.

Our app includes a web platform that enables bike sharing companies to publish bike moving tasks that will be completed by crowdsourced workers. The web application includes a map-based UI that displays transport routing paths and lists jobs for users by distance. It also provide incentives for workers with rewards such as cash, bike share credits, and gift cards.

## Technology Used to Build the App
- HTML/CSS
- JavaScript
- Node.js
- Heroku

## The Team
- Front-end logic and functions — Google API & Back-end Connection by Clark Jason Ngo
- Front-end User Experience/User Interface — Responsive Web Design by Chelsea Galvez
- Front-end logic and functions — Google API & Bike Functions by Michael Eizaguirre
- Front-end User Interface — Wireframing | Pitch by Yi-Tung (Jayson) Chen
- Back-end | Team Lead | Mentor by Stephen Chan

## Timeline of a Typical 2-Day Hackathon
### Day 1
- 8:00 AM : Doors Open & Breakfast
- 9:00 AM : Opening Ceremony, Sponsor Welcomes, & Team Building
- 10:00 AM : Coding Kick Off
- 1:00 PM : Lunch
- 2:00 PM : Sponsor Breakout Sessions
- 6:00 PM : Dinner
- 8:00 PM : Venue Closes

… We coded until 12:00 PM, got home at 3:00 AM …
### Day 2
- 8:00 AM : Venue Opens
- 8:00 AM : Breakfast
- 12:00 PM : Lunch
- 1:00 PM : Code Freeze & Submission Deadline on hackathon.io
- 1:30 PM : A/V Check
- 2:00 PM : Demos
- 4:00 PM : Winners are Announced / Prizes!

## The Challenge
The rapid growth of bike sharing in cities worldwide has led to millions of abandoned bicycles blocking streets and sidewalks, disrupting people’s daily lives and leaving piles of debris behind. Our goal was to help cities solve their problem of bike-share oversupply.

So…to the drawing board!

## Whiteboarding
Before we even started coding, we spent a few hours thinking about what the problem really was. We thought about it both from a social perspective and from the bike-sharing companies’ perspectives.

![](/hackathon-projects/CashCycle-AngelHack2018/images/01.png " ")

Instead of tackling the whole problem, we wanted to address a “specific” area in the problem. So here’s the process we went through:

### Simplify the Problem Statement
- Bikes at undesired location.

Next, we asked ourselves what we wanted to achieve in the long run instead of doing a quick-fix.

As my change management class at CityU taught me: requirements-led vs benefits-led.

### Formulate the End State
- Better distribution of bikes.

Now that we had defined our End State (bikes at desired locations), we brainstormed on what challenges lay ahead to reach that End State.

### Define the Challenges
1. Define desired and undesired
2. Identify bikes within desired location
3. Provide incentives for people to:
  - move the bike to another desired location
  - not park their bike at undesired location

As we didn’t have enough time to build the app, this led to choosing one and making assumptions.

### Tackle One Challenge
“Move the bike to another desired location,”

Assumptions: bike-sharing company provides data on “desired” and “undesired” locations.

### Idea: Crowd sourcing
Have the bike-sharing companies use our services, and we get people to move bikes from point A to point B.

### Create User Stories
We went from whiteboarding to a better visual layout using Figma.

### Pick the Best Technology
We focused on the problem at hand and used the technology we thought was best to address it.

It was very tempting to integrate AWS Lambda, Agora, or Fit Bit because of the cool prizes from the sponsors of the event.
But we knew that “forcing” a technology as a solution might not end well.

## Google Cloud APIs

### Back-end Server and Endpoint
We hosted our data on Heroku and generated a JSON file.

Our JSON endpoint assumes that the bike-sharing company provides us with the starting latitude and longitude and destination latitude and longitude, etc.
Testing Google Map APIs
With the latitude and longitude values, we were able to create the route, point A and point B, and Bike Icon Markers.

Clicking a Bike Icon would generate a blue path and two points, A and B. it also changes the zoom level to the midpoint of the blue path.

We also have an option dropdown that changes mode to “walking” and the blue straight line will change to dotted and also reroute to the best “walking path”.
At that point, we were done with coding the logic and functionalities. So on to the front end.
Front-end User Interface
We made a responsive web design and created simple yet elegant dialog boxes.

At the top left screen, we created a toggle button the shows the navigation bar. The navigation bar includes “find”, “cash out”, “notifications”, “help” and “settings”.

Clicking “Find” will generate a list of jobs available and is an alternative to clicking a Bike Icon. Distance and Reward are shown in the list.

Choosing a job from the Job List or clicking a Bike Icon will pop out a dialog box asking the user to accept the job. The dialog box also shows a summary of the distance and estimated time completion for the job selected.

Clicking “Accept This Job” will start the trip. The map will be centered on the bike’s GPS. A dialog box will show remaining Distance and Reward for completing the Job.

When the bike reaches the desired location, which is point B, adialog box will return a status that the Job has been completed!
## Code Snippets
### variables

```
var requestURL = 'https://whispering-stream-27392.herokuapp.com/job/';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
var directionsDisplay = null;
var directionsService = null;
request.onload = function() {
var myJson = request.response;
  for (var i = 0; i < myJson.length; i++) {
    // hidden code: new array from json
    makeBike(xArrSta[i], yArrSta[i], arrId[i]);
  }
populateList(rewardList, distanceList);
populateFirstJob(unmodifiedJson[0]);
}
```
Get the JSON endpoint from Heroku.
Initialize directionsDisplay and directionsService so that it when it generates a new path, the previous path will be deleted.
### Google API functions initMap() and calculateAndDisplayRoute()

```
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: changingLat, lng: changingLon},
  });
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
  origin: {lat: staLocLat, lng: staLocLong},
  destination: {lat: endLocLat, lng: endLocLong},
  travelMode: google.maps.TravelMode[selectedMode]}, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
      distance = response['routes'][0]['legs'][0]['distance']['value'];
      duration = response['routes'][0]['legs'][0]['duration']['value'];
      document.getElementById('distance').innerHTML = distance;
      document.getElementById('duration').innerHTML = duration;
    } else {
        window.alert('Directions request failed due to ' + status);
    }
  });
}
```

initMap is a Google API function that renders the map on load. You can set the zoom and center of the map.

calculateAndDisplayRoute is the function that generates the blue path. We modified the function to be able to show “distance” and “duration”.
### functions changeJobStatus(), chooseJob(id), jobAvailable()
```
function changeJobStatus(jobId, status, worker) {
// need to send id, status and workervar data = {};
var url = "https://whispering-stream-27392.herokuapp.com/job/" + jobId;
  data.id = jobId;
  data.status = status;
  data.worker = worker;
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("PATCH", url, true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function() {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "201") {console.table(users);} else {console.error(users);}};
  xhr.send(json);
}
function chooseJob(id) {
    // hidden code: id, starting lat & long, ending lat & long
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}
function jobAvailable() {
        changeJobStatus(globalId, "AVAILABLE", "Johnny Cash");
}
```
### function makeBike()
```
function makeBike(latitude, longitude, id) {
  var image = 'bicycle.png';
  if (onBike) {image = 'rDot.png';}
  if (count > 10) {image = 'green-marker.png';}
  var size = new google.maps.Size(54, 54);
  if (count > 10) {size = new google.maps.Size(60, 75)}
  var icon = {url: image, scaledSize: size, origin: new google.maps.Point(0,0), anchor: new google.maps.Point(0, 0)};
var Bike = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: map, zoom: 200, icon: icon});
if (!directionsDisplay) {directionsDisplay = new google.maps.DirectionsRenderer;}
if (!directionsService) {directionsService = new google.maps.DirectionsService;}
Bike.addListener('click', function() {
    map.setZoom(18);
    flag = true;
    map.setCenter(Bike.getPosition());
    hideStartRide();
    bikeId(id);
    $("#dialog-jobOne").show();
    // code: id, starting lat & long, ending lat & long
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  });
}
```
makeBike is a function that generates the Bike Icon marker and also styles it. It uses the calculateAndDisplayRoute function to generate its blue path.
When the coding was done, it was time to pitch!

We delivered the pitch with energy. We made sure that it had a flow and connected one idea to the others.
Presentation flow: Problem -> Problem with Numbers -> Present the App -> discuss the App as a solution -> demo.

The judges asked about scalability. There’s a lot of bike-sharing companies in the US and other countries, so we could scale internationally.
23 teams pitched and the judges deliberated…

We thought we wouldn’t win anything, as we didn’t take the challenges from AWS and Agora.

## But we won!

There’s no monetary prize or any equivalent for the runner-up. Still, it was a good experience and at least we got bragging rights. :)
## The Prize

Code For A Cause Impact Award Challenge: Build technology that solves a social or environmental problem and positively impacts your local community.

Code For A Cause Impact Award Prize: One Impact Award was given out at each event. At the end of the Global Hackathon Series, the top Impact Award projects are chosen by an expert judging panel including the Chan Zuckerberg Initiative and more. The top five teams receive an official invite into the HACKcelerator.
List of Participants

Notable creative Apps from other teams were:

A FitBit fitness tracker with a flower image that will bloom upon reaching your daily goal.

A bully reporting tool that allows witnesses and other parties to report.

An image scanning App that will check if bike is in a desired location or not.

Résumé builder that also suggests tutorials and courses based on your desired skills.

I hope you have enjoyed reading this.