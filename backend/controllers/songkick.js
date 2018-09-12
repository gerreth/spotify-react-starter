import songkickService from './songkickService';
import {
  highlight,
  getFestivalsByCity,
  reduceFestivals
} from './songkickHelper';

const songkick = new songkickService()

// Get Festivals
exports.festivals = async (req, res) => {
  const topBands = req.body.topBands
  const similarBands = req.body.similarBands.filter(band => topBands.indexOf(band) === -1)

  const promises = Object.keys(songkick.cities).map(getFestivalsByCity) // get data either from cache or songkick

  const results = await Promise
    .all(promises)
    .then(result => result)
    .catch(error => console.log(error))

  const festivals = results
    .reduce((carry, result) => [...carry, ...result], []) // merges all citites together
    .reduce(reduceFestivals, []) // reduces (maybe better map) festival objects from songkick to needed fields
    .map(festival => highlight(festival, topBands, similarBands)) // add highlight/simiar flag to festival

  const highlightFestivals = festivals.filter(festival => festival.highlight || festival.similar)

  res.send(highlightFestivals);
};
