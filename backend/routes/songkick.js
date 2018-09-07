import express from 'express'

import songkickService from '../services/songkickService'
import songkick from '../controllers/songkick'

const router = express.Router()

/*
 * Home route
 */
router.get('/', (req, res) => {
  res.send('respond with a resource')
})

/*
 * Get festivals
 */

router.post('/festivals', songkick.festivals)

/*
 * Get festivals deprecated()
 */
router.get('/festivals-deprecated', (req, res) => {
  const topBands = req.query.topBands.split('___')
  const similarBands = req.query.similarBands.split('___')

  new songkickService(similarBands, topBands).getFestivals().then(festivals => {
    return res.send(festivals)
  }).catch(error => {
    res.send({})
  })
})

module.exports = router
