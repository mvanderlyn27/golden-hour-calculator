"use strict";
// calculations to find solar angle from location/time, and to find time from location/solar angles
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc_time_for_degree = exports.calc_solar_angle = void 0;
const suncalc = __importStar(require("suncalc"));
//gets day # accounting for daylight savings
function get_days(now) {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}
function toDegrees(num) {
    return num * 180 / Math.PI;
}
function toRadians(num) {
    return num * Math.PI / 180;
}
//returns equation of time in minutes
function get_equation_of_time(day_num) {
    let b = (day_num - 81) * (360 / 364);
    return 9.87 * Math.sin(toRadians(2 * b)) - 7.53 * Math.cos(toRadians(b)) - 1.5 * Math.sin(toRadians(b));
}
function is_daylight_savings(date) {
    let jan = new Date(time.getFullYear(), 0, 1);
    let jul = new Date(time.getFullYear(), 6, 1);
    let std_tz_offset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    return date.getTimezoneOffset() < std_tz_offset;
}
//get solar declination based on day number of the year, in radians
function get_declination(days) {
    return 23.45 * Math.sin(toRadians((360 / 364) * (284 + days)));
}
//returns apparent solar time based on date, and lng
function get_apparent_solar_time(time, day_num, lng) {
    let eot = get_equation_of_time(day_num) / 60;
    console.log('eot:', eot);
    console.log('in mins:', eot * 60);
    let utc_time = time.getUTCHours() + time.getUTCMinutes() / 60 + time.getUTCSeconds() / 3600;
    console.log('utc_time:', utc_time);
    let daylight_savings_correction = is_daylight_savings(time) ? 60 : 0;
    console.log('daylight savings:', daylight_savings_correction);
    //if lng is west of prime meridian then lng is negative 
    let adjusted_long = 4 * (lng) / 60 - daylight_savings_correction / 60;
    console.log('adj_long', adjusted_long);
    return utc_time + eot - adjusted_long;
}
//gets hour angle based on apparent solar time
function get_hour_angle(ast) {
    return (ast - 12) * 15;
}
/*
declination angle - observer angle
(tan δ – tan φ) ≥ 1 there is no sunset, i.e. 24 hours of daylight;
(tan δ – tan φ) ≤ 1 there is no sunrise, i.e. 24 hours of darkness.
*/
// returns solar elevation angle at lat/lng during time, in degrees
// long is 180 to -180, for east to west
function calc_solar_angle(lat, lng, time) {
    // days of year
    let day_num = get_days(time);
    console.log('day num:', day_num);
    //decimal equiv of hours of day
    let apparent_solar_time = get_apparent_solar_time(time, day_num, lng);
    console.log('ast:', apparent_solar_time);
    // in degrees 
    let hour_angle = get_hour_angle(apparent_solar_time);
    // in degrees
    let declination = get_declination(day_num);
    console.log('dec:', declination);
    // in degrees
    let solar_angle = toDegrees(Math.asin(Math.sin(toRadians(lat)) * Math.sin(toRadians(declination)) + Math.cos(toRadians(lat)) * Math.cos(toRadians(declination)) * Math.cos(toRadians(hour_angle))));
    return solar_angle;
}
exports.calc_solar_angle = calc_solar_angle;
function calc_time_for_degree(lat, lng, degree) {
    //sin(degree) = sin(l)*sin(decl) + cos(l)*cos(decl)*cos(h(degree))
    //h(degree) = (ast(degree) -12) * 15
    // ast(degree) = utc + eot - adjusted_lng
    // h(degree) = cos^-1((sin(degree)-sin(l)*sin(decl))/cos(l)*cos(decl)) 
    // ((utc+ eot - adjusted_lng) - 12) * 15 = ^^^
    // utc = ((cos^-1((sin(degree)-sin(l)*sin(decl))/cos(l)*cos(decl)))/15) -12 - eot + adjusted_lng
}
exports.calc_time_for_degree = calc_time_for_degree;
let time = new Date("2014-07-01 12:00:00");
console.log(time);
console.log(time.getTimezoneOffset());
let angel = calc_solar_angle(0, 0, time);
console.log('sea:', angel);
let times = suncalc.getTimes(time, 0, 0);
console.log(times);
console.log(times.goldenHour);
let pos = suncalc.getPosition(time, 0, 0);
console.log(pos.altitude);
console.log(toDegrees(pos.altitude));
/*
re-read paper/other forms to see why whats different
*/
//# sourceMappingURL=solar_calc_old.js.map