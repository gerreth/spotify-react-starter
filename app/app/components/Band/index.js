/**
 * Band
 */

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import injectReducer from 'utils/injectReducer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

// Styled components
import {
  BandWrapper
} from './styled'

const styles = {
  none: {
    whiteSpace: 'pre'
  },
  highlight: {
    background: '#FEE837',
    fontWeight: 'bold',
    whiteSpace: 'pre'
  },
  similar: {
    background: '#FEE837',
    whiteSpace: 'pre'
  }
}

/* eslint-disable react/prefer-stateless-function */
export default class Band extends React.Component {
  render() {
    const {
      last,
      name,
      type,
    } = this.props

    const seperator = !last ? ', ' : ''

    return (
      <React.Fragment>
        <span style={styles[type]}>{name}</span>
        <span>{seperator}</span>
      </React.Fragment>
    )
  }
}

Band.propTypes = {
  last: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
