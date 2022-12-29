import { Map, MapRef, Marker, useMap } from 'react-map-gl';
import React, { useRef } from 'react';
function satMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`};
function topoMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}`};
const MapHolder = (props:any) => {
  let mapRef = useRef<MapRef>(null);  
  let zoomLevel = 15;
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
  const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
  };
    const updatePos = (lat:number, lng:number) => {
          if(mapRef && mapRef.current != null){
            console.log("updated: ", lat, lng);
            mapRef.current.flyTo({
              center: [lng, lat],
              zoom: zoomLevel,
              speed: 2 
            })
        }
    }
    const handleLoad = () =>{
      updatePos(props.lat, props.long);
    }
    const handleClick = (e:any) => {
      props.setLat(e.lngLat.lat);
      props.setLong(e.lngLat.lng);
      updatePos(e.lngLat.lat, e.lngLat.lng);
    }
    return (
      <Map
      initialViewState={{
        longitude: props.long,
        latitude: props.lat,
        zoom: zoomLevel
      }}
      ref = {mapRef}
      mapboxAccessToken='pk.eyJ1IjoibXZhbmRlcmx5bjI3IiwiYSI6ImNsYzJ4a3Z0czByeXUzeGw5Y2pwa20zYnQifQ.xg9KR9YUbF5fpmpXHwyLpA'
      mapStyle="mapbox://styles/mapbox/light-v11"
      onClick= {(e)=> handleClick(e)} 
      onLoad= {()=> handleLoad()}
      >
      <Marker longitude={props.long} latitude={props.lat} anchor="center" >
        <svg height={20} viewBox="0 0 24 24" style={pinStyle}>
          <path d={ICON} />
        </svg>
      </Marker>
    </Map>
    );
}
export default MapHolder;