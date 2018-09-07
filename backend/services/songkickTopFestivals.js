class songkickTopFestivals {
  constructor(topBands, similarBands) {

    similarBands = similarBands.reduce((carry, band) => {
      if (topBands.indexOf(band) === -1) {
        carry.push(band)
      }
      return carry
    }, [])

    this.props = {
      similarBands,
      topBands,
    }
  }

  highlight(festival) {
    const {
      similarBands,
      topBands,
    } = this.props

    festival.highlight = false
    festival.similar = false

    festival.artists = festival.artists.map(name => {
      const highlight = topBands.indexOf(name) > -1
      const similar = similarBands.indexOf(name) > -1
      const type = highlight ? 'highlight' : similar ? 'similar' : 'none'

      if (highlight) {
        festival.highlight = true
      }

      if (similar) {
        festival.similar = true
      }

      return {
        name,
        type,
        highlight, // needed to calculate count in Festivals component
        similar, // needed to calculate count in Festivals component
      }
    })

    return festival
  }
}

export default songkickTopFestivals
