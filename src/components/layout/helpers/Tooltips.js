import React, { useState, useEffect } from 'react'
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './Tooltips.css';

function Tooltips() {

  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    setStepsEnabled(true);
  }, [])
  
  const contacts = [
    {
      element: "[parent='Contacts'][href='/companies']",
      intro: "Add companies and their contact details to then easily manage people"
    },
    {
      element: "[parent='Contacts'][href='/people']",
      intro: "Lorem ipsum dolor sit amet consequtor"
    }
  ]
  
  const settings = [
    {
      element: "[parent='Settings'][href='/profile']",
      intro: "Set up the days and hours you work, and invite your team"
    },
    {
      element: "[parent='Settings'][href='/team']",
      intro: "Add team members, manage their hours and days and access"
    },
    {
      element: "[parent='Settings'][href='/settings']",
      intro: "Set all the app controls to run your business"
    },
    {
      element: "[parent='Settings'][href='/items-and-tasks']",
      intro: "Add all your recurring tasks and populate with descriptions"
    },
    {
      element: "[parent='Settings'][href='/expenses']",
      intro: "Add all your recurring expenses with descriptions to edit"
    },
    {
      element: "[parent='Settings'][href='/subscription']",
      intro: "Manage your subscriptions and assign to your users"
    }
  ]

  const location = window.location.href;

  const onExit = () => {
    setStepsEnabled(false);
  }

  return (
    <div>
      {
        location.includes('/companies') || location.includes('/people') ?
          <Steps
            enabled={stepsEnabled}
            steps={contacts}
            initialStep={0}
            onExit={onExit}
            options={{
              nextLabel: 'next',
              prevLabel: 'back',
              skipLabel: 'skip'
            }}
          />
        :
        location.includes('/profile') || location.includes('/team') || location.includes('/settings') || location.includes('/items-and-tasks') || location.includes('/expenses') || location.includes('/subscription') ?
          <Steps
            enabled={stepsEnabled}
            steps={settings}
            initialStep={0}
            onExit={onExit}
            options={{
              hidePrev: true,
              skipLabel: 'Skip'
            }}
          />
        : null
        
      }
    </div>
  )
}

export default Tooltips
