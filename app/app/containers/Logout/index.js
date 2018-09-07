/**
 *
 * Logout
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

/* eslint-disable react/prefer-stateless-function */
export class Logout extends React.Component {

  componentDidMount() {

  }

  render() {
    return <Redirect to='/' />
  }

}

Logout.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({});

export default compose(
  // withReducer,
  withConnect,
)(Logout);
