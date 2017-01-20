/* env browser */
/* global window, document, firebase, google, campaign */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-throw-literal */
// TODO(pascal): figure out better linting for client-side JS

var map

function initMap() {
  var styleArray = [
    {
      featureType: 'all',
      stylers: [
          { saturation: -80 }
      ]
    }, {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
          { hue: '#00ffee' },
          { saturation: 50 }
      ]
    }, {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
          { visibility: 'off' }
      ]
    }
  ]
  var options = {
    zoom: 4,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    styles: styleArray,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map'), options)
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(40, -124.39),
    new google.maps.LatLng(49.38, -66.94)
  )

  map.fitBounds(bounds)
  var geocoder = new google.maps.Geocoder()
  geocoder.geocode({ 'address': 'US' }, (results, status) => {
    map.setCenter(results[0].geometry.location)
    google.maps.event.addDomListener(window, 'resize', () => {
      google.maps.event.trigger(map, 'resize')
      map.setCenter(results[0].geometry.location)
      map.fitBounds(bounds)
    })
  })
}

var config = {
  databaseURL: 'https://staywokesignups.firebaseio.com',
}

firebase.initializeApp(config)

firebase.database().ref(`/publicInfo/${campaign.id}`).on('child_added', (snapshot) => {
  var ele = snapshot.val()
  var coords = [ele.long, ele.lat]
  var latLng = new google.maps.LatLng(coords[1], coords[0])
  var marker = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 0.5,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map,
    center: latLng,
    radius: 70000,
    animation: google.maps.Animation.DROP,
  })
})
