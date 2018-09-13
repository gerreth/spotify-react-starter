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

import reducer from './reducer';
import { ContainerWrapper } from './styled'
import { allBandsSelector } from './selectors'

/* eslint-disable react/prefer-stateless-function */
class Bands extends React.Component {

  render() {
    console.log(this.props.bands.top)
    console.log(this.props.bands.similar)
    return (
      <ContainerWrapper>
        Test
      </ContainerWrapper>
    )
  }
}

Bands.propTypes = {
  bands: PropTypes.shape({
    similar: PropTypes.array,
    top: PropTypes.array,
  })
}

const mapStateToProps = createStructuredSelector({
  bands: allBandsSelector()
})

const withConnect = connect(
  mapStateToProps,
);

// const withReducer = injectReducer({ key: 'bands', reducer });

export default compose(
  // withReducer,
  withConnect,
)(Bands)
