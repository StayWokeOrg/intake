

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
  latlong.forEach(function(ele) {
    firebasedb.ref('publicInfo/zips/' + ele.ZIP ).set(ele)

})
}

startFirebase();
// $.get('./zipsToLatLong.json', function(data, message, xhr) {
//       var latLong = (data);
//
//     }).then(startFirebase);

// Initialize Firebase
