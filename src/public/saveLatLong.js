

var config = {
  apiKey: "AIzaSyBw6HZ7Y4J1dATyC4-_mKmt3u0hLRRqthQ",
  authDomain: "staywokesignups.firebaseapp.com",
  databaseURL: "https://staywokesignups.firebaseio.com",
  storageBucket: "staywokesignups.appspot.com",
  messagingSenderId: "47559178634"
};

function startFirebase(){
  firebase.initializeApp(config);
  var firebasedb = firebase.database()
  console.log(campaign.id);
  return firebasedb.ref('/publicInfo/users/' + campaign.id).once('value').then(function(snapshot) {
    $.each(snapshot.val(), function(index, ele) {
    console.log(ele);
      var coords = [ele.long, ele.lat];
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
            })
      })
    })
}
startFirebase();
