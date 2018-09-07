import request from 'request'

import client from '../redis';
import songkickApi from './songkickApi'
import songkickTopFestivals from './songkickTopFestivals'

export default class songkickService {
  constructor(similarBands, topBands) {
    this.similarBands = similarBands
    this.topBands = topBands
  }

  getFestivals() {
    const {
      similarBands,
      topBands,
    } = this

    return new songkickApi().getFestivals().then(festivals => {
      const topFestivals = new songkickTopFestivals(topBands, similarBands)

      festivals = festivals.reduce((carry, festival) => {
        festival = topFestivals.highlight(festival)
        if (festival.highlight || festival.similar) carry.push(festival)
        return carry
      }, [])

      return festivals
    }).catch(error => {
      res.send({})
    })
  }
}
