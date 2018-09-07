/**
 *
 * Header
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

// Styled components
import {
  HeaderWrapper
} from './styled'

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/bands">Bands</Link>
        <Link to="/festivals">Festivals</Link>
        <Link to="/logout">Logout</Link>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(
  mapStateToProps,
);

// const withReducer = injectReducer({});

export default compose(
  // withReducer,
  withConnect,
)(Header);
