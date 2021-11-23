"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const solar_calc_old_2_1 = require("./solar_calc_old_2");
const app = (0, express_1.default)();
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
app.get('/solar-angle', (req, res, next) => {
    //read in location
    //optionally read in time
    //validate input
    //calculate solar angle
    //calculate time of solar angle based on input
    let data = req.query;
    //need to convert to string
    if (typeof (data.lat) === "string" && typeof (data.lng) === "string" && typeof (data.tz) === "string") {
        let lat_str = data.lat;
        let lng_str = data.lng;
        let tz_str = data.tz;
        let lat = parseInt(lat_str);
        let lng = parseInt(lng_str);
        //check for issues in input
        let time = (0, moment_1.default)(String(data.time));
        res.send({ angle: (0, solar_calc_old_2_1.calc_sun_position)(time.toDate(), lat, lng) });
    }
    else {
        next(Error("lat/lng/tz can't be parsed properly"));
    }
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
function calcGoldenHour(loc, time) {
    const twopi = 2 * Math.PI;
    const deg2rad = Math.PI / 180;
    const month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
    let day = month_days[time.getMonth()];
    let leapdays = time.getFullYear() % 4 == 0;
}
//# sourceMappingURL=main.js.map