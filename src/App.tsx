import { Navbar } from 'components/Navbar/Navbar';
import { IntlWrapper } from 'intl/IntlContext';
import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import { store } from 'store';
import { FullPageFlexBox } from 'styles/StyledComponent';
import { ThemeWrapper } from 'styles/ThemeContext';
import { Wrapper } from 'types';

const AppContextWrapper: Wrapper = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

function App() {
  return (
    <ThemeWrapper>
      <IntlWrapper>
        <AppContextWrapper>
          <FullPageFlexBox height="100vh">
            <Navbar />
          </FullPageFlexBox>
        </AppContextWrapper>
      </IntlWrapper>
    </ThemeWrapper>
  );
}

export default App;
