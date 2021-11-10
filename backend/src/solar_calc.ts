// calculations to find solar angle from location/time, and to find time from location/solar angles

import { couldStartTrivia } from "typescript";
/*
Initial Solar angle Calc
solar angle:
	sin(solar angle) = sin(lat)*sin(declination angle) + cos(lat)*cos(declination angle)*cos(elevation hour angle)
declination angle:
	doesn't change based on location, as long as you're within the same UTC same around the globe based on time
	simple_solar_declination_angle = -23.44 * cos(360/365 * (days_since_january_first + 10))
	better = sin^-1[sin(-23.44)*cos(360/365.24(d+10) + 360/pi * 0.0167*sin(360/365.24*(d-2)))]
Solar Hour Angle
	estimating sun relative to solar noon, when its highest, and will have a 0 solar hour angle
	h = LST (in mins)/4 - 180(deg)
	LST corrections:
		Equation of time:
			need to account for eccentricity of earths orbit/axial tilt
			EoT = 229.18 * [0.000075+0.001868cos(y)-0.032077sin(y)-0.014615cos(2y)-0.04089sin(2y)]
			y = fraction year in radians
			y = 2*pi/365(days-1+(hours-12)/24)
		LongV:
			Need to account for longitudinal varriation
			longv = 4*(longitude - 15 * delta_tz), longitude is in degrees, negative to the west
		Offset:
			offset = addition of 2 corrections 
			       = EoT + longV
		Correction:
			Corrected LST = LST + offset/60
	Final answer:		
		h = (LST (in mins) + offset/60)/4 - 180(degrees)
*/
//gets days of year from date jan 1 should be 0
function get_days(now:Date){
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	console.log('Day of year: ' + day);
	return day;
}
//delta tz, is time diff local from utc
//could pass in days/hours instead of actual date object
export function calc_solar_angle(lat:number, lng:number, time:Date, delta_tz: number){
	//maybe take in request timezone?
	let days = get_days(time); //not right type of day, needs to be # of days since beginning of year, where jan 1 is 0
	let declination_angle = Math.asin(Math.sin(-23.44)*Math.cos(360/365.24*(days+10)+360/Math.PI * 0.0167*Math.sin(360/365.24*(days-2))));
	//angle in degrees
	let hours = time.getHours() //should only be hours 1-24
	let fractional_year = 2 * Math.PI/365 * (days - 1 + (hours-12)/24);
	//in minutes 
	let equation_of_time = 229.18 * (0.000075+0.001868*Math.cos(fractional_year)-0.032077*Math.sin(fractional_year)-0.014615*Math.cos(2*fractional_year)-0.04089*Math.sin(2*fractional_year));
	// lng is negative when west, positive when east
	let long_v = (4*(lng-15 * delta_tz));
	// calcs in mins, divides by 60 to get hours
	let offset = (equation_of_time + long_v)/60;
	let local_solar_time = time.getHours(); //hours in day 1-24`
	let elevation_hour_angle = (local_solar_time + offset)/4 - 180;
	let solar_angle = Math.asin(Math.sin(lat)*Math.sin(declination_angle) + Math.cos(lat)*Math.cos(declination_angle)*Math.cos(elevation_hour_angle));
	return solar_angle;
}
let time = new Date();
let angel = calc_solar_angle(38,77, time, time.getTimezoneOffset())
console.log('sea:', angel);
/*
re-read paper/other forms to see why whats different
*/
