import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import welcomePage from './pages/welcomePage'
import LoginPage from './pages/loginPage'
import GoogleMapAPI from './utils/googleMapAPI'
import Chat from './pages/chat'
import Setting from './pages/setting'
import InputInfo from './pages/inputInfo'
import FAQ from './pages/faq'
import Tutorial from './pages/turotial'
import Confirm from './pages/confirm'
import PasswordForgot from './pages/passwordForgot'
import PasswordChange from './pages/passwordChange'
import PasswordConfirm from './pages/passwordConfirm'
import Summary from './pages/summary'
import Endroll from './pages/endroll'
import './App.css'
import './reset.css'

const Auth: React.FC = (props: any) => {
  const jwt = localStorage.getItem('jwt')
  return (jwt ? props.children : <Redirect to={'/login'} />)
};

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#eeedea' }}>
      <Router>
        <Switch>
          <Route path="/" component={welcomePage} exact />
          <Route path="/welcome" component={welcomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/password-reset" component={PasswordForgot} exact />
          <Auth>
            <Route path="/map" component={GoogleMapAPI} exact />
            <Route path="/chat" component={Chat} exact />
            <Route path="/setting" component={Setting} exact />
            <Route path="/inputinfo" component={InputInfo} exact />
            <Route path="/faq" component={FAQ} exact />
            <Route path="/tutorial" component={Tutorial} exact />
            <Route path="/confirm" component={Confirm} exact />
            <Route path="/password-change" component={PasswordChange} exact />
            <Route path="/passwordConfirm" component={PasswordConfirm} exact />
            <Route path="/summary" component={Summary} exact />
            <Route path="/endroll" component={Endroll} exact />
          </Auth>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
