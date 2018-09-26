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

import Band from 'components/Band'

// Styled components
import {
  FestivalWrapper
} from './styled'

/* eslint-disable react/prefer-stateless-function */
export default class Festival extends React.Component {
  render() {
    const {
      bands,
      date,
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
      // <FestivalWrapper style={{ margin: '0 auto 64px', textAlign: 'center', width: '800px' }}>
      //   <p style={{ color: '#999', fontSize: '.8em', lineHeight: '16px' }}>{date.start} - {date.end}</p>
      //   <p style={{ fontSize: '1.5em', lineHeight: '40px' }}>{name}</p>
      //   <div style={{ lineHeight: '24px' }}>{BandsList}</div>
      // </FestivalWrapper>

      <FestivalWrapper style={{ margin: '0 0 36px', width: '600px' }}>
        <p style={{ color: '#999', fontSize: '.8em', lineHeight: '18px' }}>{date.start} - {date.end}</p>
        <p style={{ fontSize: '1.5em', lineHeight: '42px' }}>{name}</p>
        <div style={{ lineHeight: '24px' }}>{BandsList}</div>
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
  name: PropTypes.string.isRequired,
}
