import * as React from 'react';
import { Typography, Layout } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css';
import LeftBar from './components/LeftBar';
import MapHolder from './components/MapHolder';
import MapProvider from 'react-map-gl';
const { Header, Footer, Sider, Content } = Layout;


// Tokens definition

function App() {

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
            <Layout>
              <Sider style={{ background: "#fff", height: "100vh" }} width={'40vw'} >
                <LeftBar lat={lat} long={long} setLat={setLat} setLong={setLong}/>
              </Sider>
              <Content>
                <MapHolder lat={lat} long={long} setLat={setLat} setLong={setLong}/>
              </Content>
            </Layout>
    </div>
  );
}

export default App;
