// calculations to find solar angle from location/time, and to find time from location/solar angles

import { couldStartTrivia } from "typescript";
import * as suncalc from 'suncalc';
//gets day # accounting for daylight savings
function get_days(now:Date){
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	return day;
}
function toDegrees(num:number){
	return num*180/Math.PI;	
}
function toRadians(num:number){
	return num*Math.PI/180;	
}
//returns equation of time in minutes
function get_equation_of_time(day_num:number){
	let b = (day_num - 81)*(360/364);
	return  9.87*Math.sin(toRadians(2*b)) - 7.53*Math.cos(toRadians(b))-1.5*Math.sin(toRadians(b))
}
function is_daylight_savings(date){
	let jan = new Date(time.getFullYear(), 0, 1);
	let jul = new Date(time.getFullYear(), 6, 1);
	let std_tz_offset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	return date.getTimezoneOffset() < std_tz_offset;
}
//get solar declination based on day number of the year, in radians
function get_declination(days:number){
	return 23.45*Math.sin(toRadians((360/364)*(284+days)));
}
//returns apparent solar time based on date, and lng
function get_apparent_solar_time(time:Date, day_num:number, lng:number){
	let eot = get_equation_of_time(day_num)/60;
	console.log('eot:',eot);
	console.log('in mins:',eot*60);
	let utc_time = time.getUTCHours() + time.getUTCMinutes()/60 + time.getUTCSeconds()/3600;
	console.log('utc_time:',utc_time);
	let daylight_savings_correction = is_daylight_savings(time)?60:0;
	console.log('daylight savings:',daylight_savings_correction);
	//if lng is west of prime meridian then lng is negative 
	let adjusted_long = 4*(lng)/60 - daylight_savings_correction/60;
	console.log('adj_long', adjusted_long);
	return  utc_time + eot - adjusted_long;
}
//gets hour angle based on apparent solar time
function get_hour_angle(ast:number){
	return (ast - 12) * 15;
}
/*
declination angle - observer angle
(tan δ – tan φ) ≥ 1 there is no sunset, i.e. 24 hours of daylight;
(tan δ – tan φ) ≤ 1 there is no sunrise, i.e. 24 hours of darkness.
*/
// returns solar elevation angle at lat/lng during time, in degrees
// long is 180 to -180, for east to west
export function calc_solar_angle(lat:number, lng:number, time:Date ){
	// days of year
	let day_num = get_days(time);
	console.log('day num:',day_num)
	//decimal equiv of hours of day
	let apparent_solar_time = get_apparent_solar_time(time, day_num,lng);
	console.log('ast:',apparent_solar_time);
	// in degrees 
	let hour_angle = get_hour_angle(apparent_solar_time);
	// in degrees
	let declination = get_declination(day_num);
	console.log('dec:',declination);
	// in degrees
	let solar_angle = toDegrees(Math.asin(Math.sin(toRadians(lat))*Math.sin(toRadians(declination)) + Math.cos(toRadians(lat))*Math.cos(toRadians(declination))*Math.cos(toRadians(hour_angle))));
	return solar_angle;
}

export function calc_time_for_degree(lat:number, lng:number, degree:number){
	//sin(degree) = sin(l)*sin(decl) + cos(l)*cos(decl)*cos(h(degree))
	//h(degree) = (ast(degree) -12) * 15
	// ast(degree) = utc + eot - adjusted_lng
	// h(degree) = cos^-1((sin(degree)-sin(l)*sin(decl))/cos(l)*cos(decl)) 
	// ((utc+ eot - adjusted_lng) - 12) * 15 = ^^^
	// utc = ((cos^-1((sin(degree)-sin(l)*sin(decl))/cos(l)*cos(decl)))/15) -12 - eot + adjusted_lng

}
let time = new Date("2014-07-01 12:00:00");
console.log(time);
console.log(time.getTimezoneOffset());
let angel = calc_solar_angle(0,0, time);
console.log('sea:', angel);
let times = suncalc.getTimes(time, 0,0);
console.log(times);
console.log(times.goldenHour);
let pos = suncalc.getPosition(time, 0,0);
console.log(pos.altitude);
console.log(toDegrees(pos.altitude));

/*
re-read paper/other forms to see why whats different
*/

