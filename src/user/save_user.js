const request = require('request')
const validateUser = require('./validate_user')
const validateCampaign = require('./validate_campaign')
const encodeUser = require('./encode_user')
const debug = require('debug')('user') // eslint-disable-line
const firebase = require('firebase')

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBw6HZ7Y4J1dATyC4-_mKmt3u0hLRRqthQ',
  authDomain: 'staywokesignups.firebaseapp.com',
  databaseURL: 'https://staywokesignups.firebaseio.com',
  storageBucket: 'staywokesignups.appspot.com',
  messagingSenderId: '47559178634',
}

firebase.initializeApp(config)

const firebasedb = firebase.database()


function makeCentralRequest(userData) {
  return new Promise((resolve, reject) => {
    // request url
    const { DATA_API, DATA_API_PORT } = process.env
    const url = `${DATA_API}:${DATA_API_PORT}/api/contacts`

    // request options
    const options = {
      url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${process.env.DATA_API_TOKEN}`,
      },
      json: true,
      body: userData,
    }

    // create the request
    request(options, (err, res, body) => {
      if (err) {
        debug(err)
        reject(err)
        return
      }

      debug(body)
      resolve(body)
    })
  })
}

module.exports = function saveUser({ user, source }) {
  return new Promise((resolve, reject) => {
    // validate user data
    const invalid = validateUser(user)
    if (invalid) return reject(invalid)

    // validate campaign
    const campaign = validateCampaign(user.campaign)
    if (!campaign) return reject('user must have a campaign')

    // validate source
    if (!source) return reject('user must have a source')

    // encode data
    const userData = encodeUser({
      user,
      campaign,
      source,
    })

    // make request
    makeCentralRequest(userData)
    .then(resolve, reject)

    if (userData.zip) {
      // post to firebase
      const firstname = userData.name.split(' ')[0]
      const newUser = firebasedb.ref(`publicInfo/${userData.campaign}`).push()
      return firebasedb.ref(`/publicInfo/zips/${userData.zip.toString()}`).once('value').then((snapshot) => {
        debug('sending to firebase:', firstname)
        newUser.set({
          name: firstname,
          zip: userData.zip,
          lat: snapshot.val().LAT,
          long: snapshot.val().LNG,
        })
      })
    }
  })
}
