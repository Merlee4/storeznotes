import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dash" component={Home} />
        <Route path="/signup" component={CreateAccount} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
