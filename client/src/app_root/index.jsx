import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { About, Contact, Home, Store } from '../pages';
import { Navigation } from '../components';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const AppRoot = _ => (
  <Router>
    <Elements stripe={stripePromise}>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/store' component={Store} />
        <Route component={_ => <Redirect to='/' />} />
      </Switch>
    </Elements>
  </Router>
);

export default AppRoot;
