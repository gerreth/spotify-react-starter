/**
 *
 * SpotifyCallback
 *
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

import saga from './saga'
import { initialize, setToken } from './actions'
import spotifyReducer from './reducer'

import bandsReducer from '../Bands/reducer'
import festivalsReducer from '../Festivals/reducer'

/* eslint-disable react/prefer-stateless-function */
export class SpotifyCallback extends React.Component {
  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g
    let q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams
  }

  componentDidMount() {
    const hashParams = this.getHashParams()
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
        {/*<Redirect to="/"/>*/}
        SpotifyCallback
      </div>
    )
  }
}

SpotifyCallback.propTypes = {
  onInit: PropTypes.func,
  setToken: PropTypes.func
}

const mapStateToProps = createStructuredSelector({

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
