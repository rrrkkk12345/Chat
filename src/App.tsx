import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './pages/chat'

import './App.css'
import './reset.css'

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#eeedea' }}>
      <Router>
        <Switch>
          <Route path="/" component={Chat} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
