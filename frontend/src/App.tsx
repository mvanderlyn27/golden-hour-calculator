import * as React from 'react';
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';
import './App.css';
import { DefaultButton } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import LeftBar from './components/LeftBar';
import Map from './components/MapHolder';
initializeIcons();

const leftBar: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
const map: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 700,
  },
};

// Tokens definition

function App() {

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      overflow: 'hidden',
      width: '100%',
    },
  };
  return (
    <div className="App">
      <Stack>
     
      <Stack horizontal styles={stackStyles}>
        <Stack.Item grow styles={leftBar}>
          <LeftBar/>
        </Stack.Item>
        <Stack.Item grow disableShrink styles={map}>
          <Map/>
        </Stack.Item>
      </Stack>
    </Stack>
    </div>
  );
}

export default App;
