/**
 * App.js
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Project imports
import Bands from 'containers/Bands/Loadable'
import Festivals from 'containers/Festivals/Loadable'
import Header from 'components/Header'
import HomePage from 'containers/HomePage/Loadable'
import Login from 'containers/Login/Loadable'
import Logout from 'containers/Logout'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import SpotifyCallback from 'containers/SpotifyCallback'

import { AppWrapper, ContentWrapper } from './styled'

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <ContentWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bands" component={Bands} />
          <Route exact path="/festivals" component={Festivals} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/spotify/callback" component={SpotifyCallback} />
          <Route component={NotFoundPage} />
        </Switch>
      </ContentWrapper>
    </AppWrapper>
  )
}
