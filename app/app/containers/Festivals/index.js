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

import reducer from './reducer';
import { ContainerWrapper } from './styled'
import { allFestivalsSelector } from './selectors'

import Festival from 'components/Festival'

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.Component {

  render() {
    const {
      festivals
    } = this.props

    console.log(festivals)

    const FestivalsList = festivals.map(festival => {
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
        <h2 style={{ fontSize: '2.5em', fontWeight: 'normal', margin: '0 0 36px 0' }}>All festivals</h2>
        {FestivalsList}
      </ContainerWrapper>
    )
  }
}

Festivals.propTypes = {
  festivals: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  festivals: allFestivalsSelector(),
})

const withConnect = connect(
  mapStateToProps,
);

const withReducer = injectReducer({ key: 'festivals', reducer });

export default compose(
  withReducer,
  withConnect,
)(Festivals)
