import { Map, Marker } from "pigeon-maps"

function satMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`};
function topoMapTiler(x:number,y:number,z:number){return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}`};

const MapHolder = () => {

    return (
    <Map provider = {topoMapTiler} height={1000} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>
    );
}
export default MapHolder;