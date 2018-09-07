class spotifyTopBands {
  constructor({
    external_urls = {},
    followers = {},
    genres = [],
    href = '',
    id = '',
    images = [],
    name = '',
    popularity = undefined,
    type = '',
    uri = ''
  }) {
    this.props = { external_urls, followers, genres, href, id, images, name, popularity, type, uri }
  }

  convert() {
    if (this.props.name === 'Bibi Blocksberg') return undefined
    if (this.props.name === 'Heisskalt') return undefined
    if (this.props.name === 'Coldplay') return undefined
    if (this.props.name === 'Simon & Garfunkel') return undefined

    const converted = {
      genres: this.props.genres,
      id: this.props.id,
      image: this.getImage().url,
      name: this.props.name,
      uri: this.props.uri,
    }

    return converted
  }

  getImage() {
    // Get preferably square images
    return this.props.images.reduce((carry, image) => {
      // do not return too small images
      if (carry && image.width < 200) return carry
      // return square images if possible
      return carry.width && carry.width === carry.height ? carry : image
    }, {})
  }
}

export default spotifyTopBands
