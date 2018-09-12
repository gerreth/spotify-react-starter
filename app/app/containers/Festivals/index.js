/*
 * Festivals
 */

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import injectReducer from 'utils/injectReducer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.Component {

  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

Festivals.propTypes = {

}

const mapStateToProps = createStructuredSelector({

})

const withConnect = connect(
  mapStateToProps,
);

// const withReducer = injectReducer({})

export default compose(
  // withReducer,
  withConnect,
)(Festivals)
