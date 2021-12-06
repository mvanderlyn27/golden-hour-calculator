import { Map, Marker } from "pigeon-maps"

function satMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`};
function topoMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}`};
const MapHolder = (props:any) => {
    
    const updatePos = (e:any) => {
        props.setLat(e.latLng[0]);
        props.setLong(e.latLng[1]);
    }
    return (
    <Map provider = {satMapTiler}  center={[props.lat, props.long]} defaultZoom={11} onClick={(e) =>updatePos(e)}>
      <Marker width={30} anchor={[props.lat, props.long]} />
    </Map>
    );
}
export default MapHolder;