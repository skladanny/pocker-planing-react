import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from '../constants';
import { Home } from '../screens/Home/Home';
import { PokerPlanningCreate } from '../screens/PokerPlanningCreate/PokerPlanningCreate';
import { RetroMeetingCreate } from '../screens/RetroMeetingCreate/RetroMeetingCreate';

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route
        path={ROUTES.retroMeetingCreate}
        exact
        component={RetroMeetingCreate}
      />
      <Route
        path={ROUTES.pokerPlanning}
        exact
        component={PokerPlanningCreate}
      />
      <Route path={ROUTES.home} exact component={Home} />
      <Redirect from={'*'} to={ROUTES.home} />
    </Switch>
  );
};
