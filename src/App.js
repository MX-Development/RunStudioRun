import React from 'react';
import styled from 'styled-components'
import './App.css';
import './Buttons.css';
import './Forms.css';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header'
import Projects from './components/projects/Projects'
import Form from './components/Form'
import Settings from './components/Settings'
import Login from './components/account/Login'

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="app" id="test-modal">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Switch>
                  <Route path="/projects" exact>
                    <Projects />
                  </Route>
                  <Route path="/form" exact>
                    <Form />
                  </Route>
                  <Route path="/settings" exact>
                    <Settings />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )
        }
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
`
