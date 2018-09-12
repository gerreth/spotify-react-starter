/*
 * Bands
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

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
class Bands extends React.Component {

  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

Bands.propTypes = {

}

const mapStateToProps = createStructuredSelector({

})

const withConnect = connect(
  mapStateToProps,
);


const withReducer = injectReducer({ key: 'bands', reducer });

export default compose(
  withReducer,
  withConnect,
)(Bands)
