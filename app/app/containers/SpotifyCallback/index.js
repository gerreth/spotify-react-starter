/**
 * SpotifyCallback
 */

import { combineReducers, compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import { getHashParams } from 'helper'

import saga from './saga'
import { initialize, setToken } from './actions'
import spotifyReducer from './reducer'
import {
  spotifyFinishedSelector,
  spotifyLoadingSelector
} from './selectors'

import bandsReducer from 'containers/Bands/reducer'
import festivalsReducer from 'containers/Festivals/reducer'

/* eslint-disable react/prefer-stateless-function */
export class SpotifyCallback extends React.Component {
  componentDidMount() {
    const hashParams = getHashParams()

    this.props.setToken(hashParams.access_token)

    this.props.onInit()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>SpotifyCallback</title>
          <meta name="description" content="Description of SpotifyCallback" />
        </Helmet>
        {this.props.loading &&
          <span>loading...</span>
        }
        {this.props.finished &&
          <Redirect to="/"/>
        }
      </div>
    )
  }
}

SpotifyCallback.propTypes = {
  finished: PropTypes.bool,
  loading: PropTypes.bool,
  onInit: PropTypes.func,
  setToken: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  finished: spotifyFinishedSelector(),
  loading: spotifyLoadingSelector()
})

function mapDispatchToProps(dispatch) {
  return {
    onInit: () => dispatch(initialize()),
    setToken: (token) => dispatch(setToken(token))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const withSpotifyReducer = injectReducer({ key: 'spotify', reducer: spotifyReducer })
const withBandsReducer = injectReducer({ key: 'bands', reducer: bandsReducer })
const withFestivalsReducer = injectReducer({ key: 'festivals', reducer: festivalsReducer })

const withSaga = injectSaga({ key: 'whatever', saga })

export default compose(
  withBandsReducer,
  withFestivalsReducer,
  withSpotifyReducer,
  withSaga,
  withConnect,
)(SpotifyCallback)
