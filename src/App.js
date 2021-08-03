import React from 'react';
import styled from 'styled-components'
import './App.css';
import './Buttons.css';
import './Forms.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header'
import Projects from './components/projects/Projects'
import Form from './components/Form'

function App() {
  return (
    <div className="app" id="test-modal">
      <Router>
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
            </Switch>
          </AppBody>
        </>
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
