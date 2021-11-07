import express from 'express';
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
app.get('/solar-angle', (req,res) => {
  //read in location
  //optionally read in time
  //validate input
  //calculate solar angle
  //calculate time of solar angle based on input
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
interface Loc {
  lat: number,
  lng: number 
}

function calcGoldenHour(loc: Loc, time: Date){

}