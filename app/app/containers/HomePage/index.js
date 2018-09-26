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
import { topFestivalsSelector } from '../Festivals/selectors'

import Festival from 'components/Festival'

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {

  render() {
    console.log(this.props.highlight)

    const FestivalsList = this.props.highlight.map(festival => {
      return (
        <Festival
          bands={festival.artists}
          date={festival.date}
          name={festival.name}
        />
      )
    })

    return (
      <ContainerWrapper>
        <h2 style={{ fontSize: '2.5em', fontWeight: 'normal', margin: '0 0 36px 0' }}>Top 5</h2>
        {FestivalsList}
      </ContainerWrapper>
    )
  }
}

HomePage.propTypes = {
  highlight: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  highlight: topFestivalsSelector(),
})

const withConnect = connect(
  mapStateToProps,
);


// const withReducer = injectReducer({})

export default compose(
  // withReducer,
  withConnect,
)(HomePage)
