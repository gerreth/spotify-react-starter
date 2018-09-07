import songkickService from './songkickService';

const songkick = new songkickService()

export const highlight = (festival, topBands, similarBands) => {
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

export const getFestivalsByCity = async (city) => {
  let page = 1
  const events = []
  const response = await songkick.getResponse(songkick.cities[city], page)
  events.push(...response.resultsPage.results.event)

  const { perPage, totalEntries } = response.resultsPage
  const numPages = Math.ceil(parseInt(totalEntries)/parseInt(perPage))

  if (numPages > 1) {
    // make parallel!
    while (page < numPages) {
      page++
      const response = await songkick.getResponse(songkick.cities[city], page)
      events.push(...response.resultsPage.results.event)
    }
  }

  return events
}

export const reduceFestivals = (carry, festival) => {
  const result = {}

  result.name = festival.displayName
  result.date = {
    start: festival.start.date,
    end: festival.end.date,
  }

  result.location = {
    city: festival.location.city.split(',')[0],
    country: festival.location.city.split(',')[1]
  }

  result.venue = festival.venue
  result.artists = festival.performance.map(performance => performance.displayName)

  return [...carry, result]
}
