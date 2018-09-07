/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import injectReducer from 'utils/injectReducer'
import { Link } from 'react-router-dom'
import messages from './messages'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {

  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

HomePage.propTypes = {

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
)(HomePage)
