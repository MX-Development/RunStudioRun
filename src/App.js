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
import Form from './components/Form'
import Settings from './components/settings/Settings'
import Login from './components/account/Login'
import MaterialTable from './components/MaterialTable';
import Subscription from './components/settings/Subscription';

// Work
import Projects from './components/work/Projects'
import Project from './components/work/Project'
import Estimates from './components/work/Estimates';
import Purchases from './components/work/Purchases';
import Invoices from './components/work/Invoices';

// Contacts
import Companies from './components/contacts/Companies';
import People from './components/contacts/People';

// Settings
import YourTeam from './components/settings/YourTeam';
import ItemsTasks from './components/settings/ItemsTasks';
import Expenses from './components/settings/Expenses';
import Profile from './components/settings/Profile';

import DragList from './components/DragList';
import DragList2 from './components/DragList2';

import ToDos from './components/to-dos/ToDos';
import Reports from './components/work/Reports';

import BackgroundImage from './components/assets/img/greyhounds/corner-left-hound.svg'
import Components from './components/Components';

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="app" id="test-modal" style={{ backgroundImage: `url(${ BackgroundImage })`, backgroundPosition: 'bottom -75px right -75px', backgroundRepeat: 'no-repeat' }}>
      <Router>
        {
          !user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Switch>
                  {/* <Route path="/draglist" exact>
                    <DragList />
                  </Route>
                  <Route path="/draglist2" exact>
                    <DragList2 />
                  </Route>

                  <Route path="/projects" exact>
                    <Projects />
                  </Route>
                  <Route path="/form" exact>
                    <Form />
                  </Route>
                  <Route path="/table" exact>
                    <MaterialTable /> 
                  </Route> */}


                  <Route exact path="/components" component={Components} />

                  <Route exact path="/to-do" component={ToDos} />

                  {/* Work */}
                  <Route exact path="/projects" component={Projects} />
                  <Route
                    exact
                    path='/projects/add'
                    render={(props) => (
                      <Projects {...props} add={true} />
                    )}
                  />
                  <Route path="/projects/:id/:view?/:viewID?" component={Project} />
                  <Route exact path="/estimates" component={Estimates} />
                  <Route path="/estimates/:id" component={Estimates} />
                  <Route exact path="/purchases" component={Purchases} />
                  <Route
                    exact
                    path='/purchases/add'
                    render={(props) => (
                      <Purchases {...props} add={true} />
                    )}
                  />
                  <Route path="/purchases/:id" component={Purchases} />
                  <Route exact path="/invoices" component={Invoices} />
                  <Route path="/invoices/:id" component={Invoices} />
                  <Route exact path="/reports" component={Reports} />

                  {/* Contacts */}
                  <Route exact path="/companies" component={Companies} />
                  <Route
                    exact
                    path='/companies/add'
                    render={(props) => (
                      <Companies {...props} add={true} />
                    )}
                  />
                  <Route path="/companies/:id" component={Companies} />
                  <Route exact path="/people" component={People} />
                  <Route
                    exact
                    path='/people/add'
                    render={(props) => (
                      <People {...props} add={true} />
                    )}
                  />
                  <Route path="/people/:id" component={People} />

                  {/* Settings */}
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/team" component={YourTeam} />
                  <Route
                    exact
                    path='/team/add'
                    render={(props) => (
                      <YourTeam {...props} add={true} />
                    )}
                  />
                  <Route path="/team/:id" component={YourTeam} />
                  <Route exact path="/items-and-tasks" component={ItemsTasks} />
                  <Route
                    exact
                    path='/items-and-tasks/add'
                    render={(props) => (
                      <ItemsTasks {...props} add={true} />
                    )}
                  />
                  <Route path="/items-and-tasks/:id" component={ItemsTasks} />
                  <Route exact path="/expenses" component={Expenses} />
                  <Route
                    exact
                    path='/expenses/add'
                    render={(props) => (
                      <Expenses {...props} add={true} />
                    )}
                  />
                  <Route path="/expenses/:id" component={Expenses} />
                  <Route path="/settings" exact>
                    <Settings />
                  </Route>
                  <Route path="/subscription" exact>
                    <Subscription /> 
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
