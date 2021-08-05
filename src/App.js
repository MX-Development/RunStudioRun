import React from 'react';
import styled from 'styled-components'
import './App.css';
import './Buttons.css';
import './Forms.css';
import './Table.css';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingScreen from './components/LoadingScreen';

import Header from './components/Header'
import Projects from './components/projects/Projects'
import Form from './components/Form'
import Settings from './components/Settings'
import Login from './components/account/Login'
import MaterialTable from './components/MaterialTable';
import Companies from './components/contacts/Companies';
import Subscription from './components/settings/Subscription';
import YourTeam from './components/settings/YourTeam';
import ItemsTasks from './components/settings/ItemsTasks';

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <LoadingScreen />
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
                  <Route path="/table" exact>
                    <MaterialTable /> 
                  </Route>
                  <Route path="/companies" exact>
                    <Companies /> 
                  </Route>
                  <Route path="/subscription" exact>
                    <Subscription /> 
                  </Route>

                  <Route exact path="/team" component={YourTeam} />
                  <Route path="/team/:id" component={YourTeam} />

                  <Route exact path="/items-and-tasks" component={ItemsTasks} />
                  <Route path="/items-and-tasks/:id" component={ItemsTasks} />

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
