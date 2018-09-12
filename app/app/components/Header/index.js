/**
 * Header
 */

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import injectReducer from 'utils/injectReducer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import { spotifyTokenSelector } from 'containers/SpotifyCallback/selectors'

// Styled components
import {
  HeaderWrapper
} from './styled'

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    const { token } = this.props
    return (
      <HeaderWrapper>
        <Link to="/">Home</Link>
        {token &&
          <React.Fragment>
            <Link to="/bands">Bands</Link>
            <Link to="/festivals">Festivals</Link>
            <Link to="/logout">Logout</Link>
          </React.Fragment>
        }
        {!token &&
          <Link to="/login">Login</Link>
        }
      </HeaderWrapper>
    )
  }
}

Header.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
  token: spotifyTokenSelector()
})

const withConnect = connect(
  mapStateToProps,
)

export default compose(
  withConnect,
)(Header)
