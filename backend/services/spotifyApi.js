import request from 'request'
import client from '../redis';

class spotifyApiMe {
  constructor(options) {
    this.options = {
      headers: { 'Authorization': 'Bearer ' + options.token },
      json: true,
      method: 'GET',
      url: options.url,
    }
  }

  request() {
    return new Promise((resolve, reject) => {
      request(this.options, (error, response, body) => {
        if (error || response.statusCode !== 200) reject(response)

        resolve(body)
      })
    })
  }
}

export default spotifyApiMe
