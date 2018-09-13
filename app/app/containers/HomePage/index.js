/*
 * HomePage
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

import { ContainerWrapper } from './styled'
import { highlightFestivalsSelector } from '../Festivals/selectors'

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {

  render() {
    console.log(this.props.highlight)
    return (
      <ContainerWrapper>
        Test
      </ContainerWrapper>
    )
  }
}

HomePage.propTypes = {
  highlight: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  highlight: highlightFestivalsSelector(),
})

const withConnect = connect(
  mapStateToProps,
);


// const withReducer = injectReducer({})

export default compose(
  // withReducer,
  withConnect,
)(HomePage)
