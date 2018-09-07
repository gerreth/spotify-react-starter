import axios from 'axios'
import client from '../redis';

export default class songkickService {

  constructor() {
    const min_date = '2018-07-01'
    const max_date = '2019-06-30'
    const type = 'festival'
    const api_key = 'VNvgkjz2uCB5y2G6'

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

    this.baseUrl = `https://api.songkick.com/api/3.0/events.json?apikey=${api_key}&min_date=${min_date}&max_date=${max_date}&type=${type}`
  }

  async getCache(url) {
    return new Promise((resolve, reject) => {
      client.get(url, (error, result) => {
        resolve(JSON.parse(result))
      })
    })
    .then(result => result)
    .catch(error => console.log(error))
  }

  async makeRequest(url) {
    const response = await axios.get(url).then(response => response.data)
    client.set(url, JSON.stringify(response))
    client.expire(url, 24*60*60)
    return response
  }

  async getResponse(city, page) {
    const url = `${this.baseUrl}&location=sk:${city}&page=${page}`
    let cache

    try {
      cache = await this.getCache(url)
    } catch(error) {
      console.log(error)
    }

    if (cache !== null) {
      console.log('from cache')
      return cache
    } else {
      let response

      try {
        response = await this.makeRequest(url)
      } catch(error) {
        console.log(error.body)
      }
      console.log('from api')
      return response
    }
  }
}
