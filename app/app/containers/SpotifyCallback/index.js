/**
 *
 * SpotifyCallback
 *
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router'

import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SpotifyCallback extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <div>
        <Helmet>
          <title>SpotifyCallback</title>
          <meta name="description" content="Description of SpotifyCallback" />
        </Helmet>
        <Redirect to="/"/>
        SpotifyCallback
      </div>
    );
  }
}

SpotifyCallback.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({})
const withSaga = injectSaga({ key: 'spotify', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(SpotifyCallback);
