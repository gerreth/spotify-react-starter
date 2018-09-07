import request from 'request'

import client from '../redis';
import spotifyApi from '../services/spotifyApi'
import spotifyTopBands from '../services/spotifyTopBands'

class spotifyService {
  constructor(token) {
    this.token = token
  }

  convert(result) {
    return result.map(band => {
      return new spotifyTopBands(band).convert()
    }).filter(_ => _ !== undefined)
  }

  getSimilarBands(ids) {
    const {
      token,
    } = this

    // Check for all ids, if the request is cached, then return promise witch cached or api request
    const promises = ids.map(id => {
      const url = `https://api.spotify.com/v1/artists/${id}/related-artists`

      return new Promise((resolve, reject) => {
        client.get(url, (error, result) => {
          resolve(JSON.parse(result))
        })
      }).then(result => {
        if (result !== null) {
          return result
        } else {
          try {
            return new spotifyApi({ token, url }).request().then((body) => {
              client.set(url, JSON.stringify(body))
              client.expire(url, 7*24*60*60)

              return body
            }).catch(error => {

            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    })

    // Resolve all promises (Could hit API limit...)
    return Promise.all(promises).then(results => {
      const artists = results
        .reduce((carry, result) => [...carry, ...result.artists], [])
        .reduce((carry, artist) => {
          const exists = carry.filter(_ => _.id === artist.id)
          // Increment similarCount if artist found in array
          artist.similarCount = (exists.length > 0) ? exists[0].similarCount + 1 : 1

          return [...carry.filter(_ => _.id !== artist.id), artist]
        }, [])

      return this.convert(artists)
    }).catch(error => {

    })
  }

  getTopBands() {
    const {
      token,
    } = this

    const base_url = 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0'
    // const time_ranges = ['short_term', 'medium_term', 'long_term']
    const time_ranges = ['medium_term', 'long_term']

    // Create promises for all time ranges
    const promises = time_ranges.map(time_range => {
      const url = `${base_url}&time_range=${time_range}`

      return new Promise(resolve => {
        // TODO: Better way to cache. Maybe HashSet?
        console.log(`${url}&token=${token}`)
        client.get(`${url}&token=${token}`, (error, result) => {
          resolve(result)
        })
      }).then(result => {
        if (result) {
          console.log('Get top bands from Redis')
          result = JSON.parse(result).items
          return this.convert(result)
        } else {
          console.log('Get top bands from API')
          return new spotifyApi({ token, url }).request().then((body) => {
            // TODO: Better way to cache. Maybe HashSet?
            client.set(`${url}&token=${token}`, JSON.stringify(body))
            client.expire(`${url}&token=${token}`, 24*60*60)

            return this.convert(body.items)
          }).catch(error => {
            console.log(error)
            return {}
          })
        }
      }).catch(error => {
        console.log(error)
        return {}
      })
    })

    return Promise.all(promises).then(results => {
      // results = [...results[0], ...results[1], ...results[2]].reduce((carry, band) => {
      results = [...results[0], ...results[1]].reduce((carry, band) => {
        if (!carry.filter(_ => _.name === band.name).length) carry.push(band)
        return carry
      }, [])

      console.log('results.length ', results.length)

      return results
    })

  }
}

export default spotifyService
