import redis from 'redis'

const host = process.env.HOST || 'spotify_redis'
const auth = process.env.AUTH || ''
const port = process.env.PORT || 6379

class Redis {
  constructor() {
    const client = redis.createClient(port, host)
    if (auth !== '') {
      client.auth(auth)
    }

    client.on('connect', () => {
      console.log(':: Redis client connected with ' + host);
    })

    client.on('error', (err) => {
        console.log(':: Something went wrong ' + err)
    })

    return client
  }
}

module.exports = new Redis()
