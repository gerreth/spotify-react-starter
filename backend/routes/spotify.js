import express from 'express'
import request from 'request'

import spotifyService from '../services/spotifyService'

const router = express.Router()

/*
 * Home route
 */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

/*
 * Get related bands
 */
router.get('/similar-bands', (req, res, next) => {
  const ids = req.query.ids.split('___')
  const token = req.query.token

  new spotifyService(token).getSimilarBands(ids).then(similarBands => {
    return res.send(similarBands)
  }).catch(error => {
    res.send({})
  })
})

/*
 * Get top bands for user (new)
 */
router.get('/top-bands', (req, res, next) => {
  const token = req.query.token

  new spotifyService(token).getTopBands().then(topBands => {
    return res.send(topBands)
  }).catch(error => {
    res.send({})
  })
})

/*
 * Get top bands for user (new)
 */
router.get('/play', (req, res, next) => {
  const token = req.query.token
  const context_uri = req.query.uri

  const options = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'content-type':'application/json'
    },
    json: true,
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    body: { context_uri }
  }


  const promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if(error || response.statusCode !== 200) reject(response)

      resolve(response)
    })
  })

  promise.then(result => {

  }).catch(error => {
    console.log(error.body)
  })
})

module.exports = router
