/**
 * Festival
 */
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import injectReducer from 'utils/injectReducer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import { theme } from 'theme/'
import { formatDate } from 'helper'

import Band from 'components/Band'

// Styled components
import {
  FestivalBandsWrapper,
  FestivalDate,
  FestivalLocation,
  FestivalName,
  FestivalWrapper,
} from './styled'

/* eslint-disable react/prefer-stateless-function */
export default class Festival extends React.Component {
  render() {
    const {
      bands,
      date,
      location,
      name,
    } = this.props

    const BandsList = bands.map((band, index) => {
      return (
        <Band
          last={index === bands.length-1}
          name={band.name}
          type={band.type}
        />
      )
    })

    return (
      <FestivalWrapper>
        <FestivalLocation>
          {location.city}, {location.country}
        </FestivalLocation>
        <FestivalDate>
          {formatDate(date.start)} - {formatDate(date.end)}
        </FestivalDate>
        <FestivalName>
          {name}
        </FestivalName>
        <FestivalBandsWrapper>
          {BandsList}
        </FestivalBandsWrapper>
      </FestivalWrapper>
    )
  }
}

Festival.propTypes = {
  bands: PropTypes.array.isRequired,
  date: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
}
