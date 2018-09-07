import request from 'request'

import client from '../redis';

class songkickApi {
  constructor() {
    this.min_date = '2018-07-01'
    this.max_date = '2019-06-30'
    this.type = 'festival'

    this.cities = {
      Amsterdam: '31366',
      Barcelona: '28714',
      Berlin: '28443',
      Budapest: '29047',
      Eindhoven: '31380',
      Hamburg: '28498',
      Lissabon: '31802',
      London: '24426',
      Madrid: '28755',
      Manchester: '24475',
      Matlock: '24517',
      Nantes: '28901',
      Paris: '28909',
      SaintMalo: '28922',
    }

    this.countries = {
      DE: {
        Berlin: '28443',
        Hamburg: '28498',
        Nuremberg: '',
      },
      ES: {
        Barcelona: '28714',
        Madrid: '28755',
      },
      FR: {
        Nantes: '28901',
        Paris: '28909',
        SaintMalo: '28922',
      },
      HU: {
        Budapest: '29047',
      },
      NL: {
        Amsterdam: '31366',
        Eindhoven: '31380',
      },
      PT: {
        Lissabon: '31802',
        Porto: '',
      },
      UK: {
        Glastonbury: '',
        London: '24426',
        Leeds: '',
        Manchester: '24475',
        Reading: '',
      },
    }

    this.api_key = 'VNvgkjz2uCB5y2G6'
  }

  getFestivals() {
    const {
      min_date,
      max_date,
      type,
      cities,
      api_key,
    } = this

    const promises = Object.keys(cities).map(key => {
      let page = 1

      const id = cities[key]
      const baseUrl = `https://api.songkick.com/api/3.0/events.json?apikey=${api_key}&location=sk:${id}&min_date=${min_date}&max_date=${max_date}&type=${type}`

      const url = `${baseUrl}&page=${page}`

      return new Promise((resolve, reject) => {
        client.get(url, (error, result) => {
          resolve(JSON.parse(result))
        })
      }).then(result => {
        if (result) {
          return result
        } else {
          return new Promise((resolve, reject) => {
            request({ url }, (error, response, body) => {
              body = JSON.parse(body)
              if(error || body.resultsPage.status !== 'ok') {
                reject(response)
              } else {
                client.set(url, JSON.stringify(body))
                client.expire(url, 24*60*60);
              }

              resolve(body)
            })
          })
        }
      }).then(result => {
        const perPage = result.resultsPage.perPage
        const totalEntries = result.resultsPage.totalEntries
        const numPages = Math.ceil(parseInt(totalEntries)/parseInt(perPage))

        if (numPages > 1) {
          const firstPage = result.resultsPage.results.event
          const paginatedPromises = []

          while (page < numPages) {
            page++
            const url = `${baseUrl}&page=${page}`
            paginatedPromises.push(new Promise((resolve, reject) => {
              client.get(url, (error, result) => {
                resolve(JSON.parse(result))
              })
            }).then(result => {
              if (result) {
                return result
              } else {
                return new Promise((resolve, reject) => {
                  request({ url }, (error, response, body) => {
                    body = JSON.parse(body)
                    if(error || body.resultsPage.status !== 'ok') {
                      reject(response)
                    } else {
                      client.set(url, JSON.stringify(body))
                      client.expire(url, 24*60*60);
                    }

                    resolve(body)
                  })
                })
              }
            }))
          }

          return Promise.all(paginatedPromises).then(results => {
            const newPages = results.reduce((carry, result) => {
              return [...carry, ...result.resultsPage.results.event]
            }, [])

            return [...firstPage, ...newPages]
          })
        } else {
          return result.resultsPage.results.event
        }
      })
    })

    return Promise.all(promises).then(results => {
      let festivals = results
        .reduce((carry, result) => [...carry, ...result], [])
        .reduce((carry, festival) => {
          // Account for possible duplicates
          const exists = carry.filter(_ => _.name === festival.displayName)

          let result = {}

          if (festival.displayName === 'Reeperbahn Festival 2018') {
            console.log('Reeperbahn', festival.venue)
          }

          result.name = festival.displayName
          result.date = {
            start: festival.start.date,
            end: festival.end.date,
          }

          const location = festival.location.city.split(',')

          result.location = {}
          result.location.city = location[0]
          result.location.country = location[1]

          result.venue = (exists.length > 0) ? [...exists[0].venue, festival.venue] : [festival.venue]
          // If duplicate found, merge artists
          result.artists = (exists.length > 0) ? [...exists[0].artists, ...festival.performance.map(artist => artist.displayName)] : festival.performance.map(artist => artist.displayName)

          return [...carry.filter(_ => _.name !== festival.displayName), result]
        }, [])

      festivals = festivals.map(festival => {
        return festival
      })

      return festivals
    }).catch(error => {
      console.log(error.body)
    })
  }
}

export default songkickApi
