var config = {
  apiKey: 'AIzaSyBw6HZ7Y4J1dATyC4-_mKmt3u0hLRRqthQ',
  authDomain: 'staywokesignups.firebaseapp.com',
  databaseURL: 'https://staywokesignups.firebaseio.com',
  storageBucket: 'staywokesignups.appspot.com',
  messagingSenderId: '47559178634',
}

firebase.initializeApp(config)

var animateCircle = function (circle) {
  var rMin = 70000;
  setInterval(function() {
      var radius = circle.getRadius();
      if (radius > rMin) {
        circle.setRadius(radius - 500);
      }
  }, 10);
}

firebase.database().ref('/publicInfo/' + campaign.id).on('child_added' , function(snapshot){
  var ele = snapshot.val()
  var coords = [ele.long, ele.lat]
  var latLng = new google.maps.LatLng(coords[1], coords[0])
  var marker = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 0.5,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: latLng,
    radius: 120000,
    animation: google.maps.Animation.DROP,
  })
  animateCircle(marker);
})
