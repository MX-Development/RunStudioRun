import React, { useState } from 'react'
import { Steps, Hints } from 'intro.js-react';
// import '../../node_modules/intro.js/introjs.css';
import './Tooltips.css';

function Tooltips() {

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);
  const steps = [
    {
      element: "[parent='Contacts'][href='/companies']",
      intro: "Add companies and their contact details to then easily manage people"
    },
    {
      element: "[parent='Contacts'][href='/people']",
      intro: "Lorem ipsum dolor sit amet consequtor"
    }
  ]

  const location = window.location.href;

  const onExit = () => {
    setStepsEnabled(false);
  }

  return (
    <div>
      {
        location.includes('/companies') ?
          <Steps
            enabled={stepsEnabled}
            steps={steps}
            initialStep={initialStep}
            onExit={onExit}
          />
        : null
      }
    </div>
  )
}

export default Tooltips
