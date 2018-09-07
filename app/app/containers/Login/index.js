/**
 *
 * Login
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import querystring from 'querystring'

/* eslint-disable react/prefer-stateless-function */
export default class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  spotifyLogin() {
    const config = {
      client_id: 'b7c40a45f58849a2a33c90b70ca8a222',
      redirect_uri: 'http://localhost:9000/spotify/callback',
      response_type: 'token',
      scope: 'user-read-private user-read-email user-top-read user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private',
      show_dialog: true,
    }
    const url = `https://accounts.spotify.com/authorize?${querystring.stringify(config)}`
    window.location.href = url
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>

        <div onClick={this.spotifyLogin}>
          <a>Log in with spotify</a>
        </div>
      </div>
    )
  }
}
