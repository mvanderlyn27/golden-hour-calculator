import * as React from 'react';
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css';
import {  getTheme, TextField, ITextFieldStyles} from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import LeftBar from './components/LeftBar';
import MapHolder from './components/MapHolder';
import MapProvider from 'react-map-gl';
initializeIcons();
const theme = getTheme();
const leftBar: IStackItemStyles = {
  root: {
    alignItems: 'start',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 500
  },
};
const mapSearch: IStackItemStyles = {
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
const mapHolder: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};

// Tokens definition

function App() {

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      overflow: 'hidden',
      display: 'flex',
      height: `100vh`
    },
  };
  const mapTextStyles: ITextFieldStyles = {
    root: {
      height: `5vh`
    },
    field: {
      height: `3vh`
    },
    description: {},
    errorMessage  : {},
    fieldGroup : {height: `3vh`},
    icon: {},
    prefix: {},
    revealButton: {},
    revealIcon: {},
    revealSpan: {},
    subComponentStyles: {label: {}},
    suffix: {},
    wrapper: {},

  }
 let userLat = null; 
 let userLong = null; 
  React.useEffect( ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position:any)=>{
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        if(position?.coords?.latitude !=null && position?.coords?.longitude != null){
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        }else{
          console.log('error loading lat/lng');
        }
      });
    } else {
      console.log('user declined geolocation');
    }
  }, []);
  
  const [lat, setLat] = React.useState<number|null>(39);
  const [long, setLong] = React.useState<number|null>(-77);
  return (
    <div className="App">
      {/* <MapProvider
      mapboxAccessToken='pk.eyJ1IjoibXZhbmRlcmx5bjI3IiwiYSI6ImNsYzJ4a3Z0czByeXUzeGw5Y2pwa20zYnQifQ.xg9KR9YUbF5fpmpXHwyLpA'
      > */}
        <Stack horizontal grow styles={stackStyles}>
          <Stack.Item styles={leftBar}>
            <LeftBar lat={lat} long={long} setLat={setLat} setLong={setLong}/>
          </Stack.Item>
          <Stack.Item grow styles={mapHolder}>
            <Stack grow styles={stackStyles}>
          <Stack.Item  hidden styles={mapSearch}>
              <TextField styles ={mapTextStyles} style={{ boxShadow: theme.effects.elevation64 }} placeholder="Search Location"/> 
              </Stack.Item>
          <Stack.Item grow styles={mapHolder}>
              <MapHolder lat={lat} long={long} setLat={setLat} setLong={setLong}/>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      {/* </MapProvider> */}
    </div>
  );
}

export default App;
