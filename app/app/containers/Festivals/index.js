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

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.Component {

  render() {
    console.log(this.props.festivals)
    return (
      <ContainerWrapper>
        Test
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
