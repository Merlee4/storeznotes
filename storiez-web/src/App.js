import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Shared from './pages/Shared'
import CreateAccount from './pages/CreateAccount';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={CreateAccount} />
        <Route exact path="/" component={Main} />
        <Route exact path="/shared" component={Shared} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
