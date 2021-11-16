import express from "express";
import moment from "moment";
import { calc_sun_position } from './solar_calc'
const app = express();
const port = 3000;
//route notes
//make account
//save searches 
//set reminders?
//db of points of interest
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
//take in location/time of year, return golden hour time
app.get('/solar-angle', (req,res,next) => {
  //read in location
  //optionally read in time
  //validate input
  //calculate solar angle
  //calculate time of solar angle based on input
  let data= req.query;
  //need to convert to string

  if(typeof(data.lat) === "string" && typeof(data.lng) === "string" && typeof(data.tz) === "string"){
    let lat_str:string = data.lat;
    let lng_str:string = data.lng;
    let tz_str:string = data.tz;
    
    let lat:number = parseInt(lat_str);
    let lng:number = parseInt(lng_str);
    //check for issues in input
    let time = moment(String(data.time));
    res.send({angle: calc_sun_position(time.toDate(),lat,lng)});
  }
  else{
    next(Error("lat/lng/tz can't be parsed properly"));
  }
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
interface Loc {
  lat: number,
  lng: number 
}

function calcGoldenHour(loc: Loc, time: Date){
  const twopi = 2 * Math.PI;
  const deg2rad = Math.PI / 180;
  const month_days = [31,28,31,30,31,30,31,31,30,31,30];
  let day = month_days[time.getMonth()];
  let leapdays = time.getFullYear() % 4 == 0 
}