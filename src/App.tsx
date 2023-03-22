import { AppContextWrapper } from 'components/AppContext';
import { IntlWrapper } from 'intl/IntlContext';
import React from 'react';
import { ThemeWrapper } from 'styles/ThemeContext';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <ThemeWrapper>
      <IntlWrapper>
        <AppContextWrapper>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
              </a>
            </header>
          </div>
        </AppContextWrapper>
      </IntlWrapper>
    </ThemeWrapper>
  );
}

export default App;
