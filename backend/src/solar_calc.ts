// calculations to find solar angle from location/time, and to find time from location/solar angles
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
function is_leap_year(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function get_years_since_1949(year:number){
	let leap_years_to_1949 = 472;
	let leap_days_in_a_year = 0.2425;
	console.log('year',year);
	let leap_years_to_given_year = Math.round(year* leap_days_in_a_year);
	console.log('leap years to given year',leap_years_to_given_year);
	return leap_years_to_given_year - leap_years_to_1949;
}

function calc_time(time:Date){
	let days = get_days(time);
	if(is_leap_year(time.getFullYear())){
		days +=1;
	}	
	//get julian date - 2400000
	let hour = time.getHours() + time.getMinutes()*60 + time.getSeconds()*3600;
	console.log('hour',hour);
	let delta = time.getFullYear() - 1949;
	console.log('delta',delta);
	let leap = get_years_since_1949(time.getFullYear());
	console.log('leap',leap);
	let jd = 32916.5 + (delta * 365) + leap + days + hour/24;
	console.log('jd',jd);
	return jd-51545;
}
function get_mean_long_degrees(time:number){
	return ((280.460 + 0.9856474 * time) % 360);
}
function get_mean_anomaly_rads(time:number){
    return toRadians((357.528 + 0.9856003 * time) % 360);
}
function get_ecliptic_long_rads(mn_long:number,mn_anom:number){
	    return (toRadians((mn_long + 1.915 * Math.sin(mn_anom) + 0.020 * Math.sin(2 * mn_anom)) % 360));
}
function get_ecliptic_obliquity_rads (time:number){
    return toRadians(23.439 - 0.0000004 * time);
}
function right_ascension_radians(ec_oblq, ec_lng){
	let num = Math.cos(ec_oblq) * Math.sin(ec_lng)
    let den = Math.cos(ec_lng)
    let ra = Math.atan(num / den)
    if(den<0){
		ra += Math.PI;
	}
    else if (den >= 0 && num < 0){
		ra += 2 * Math.PI;
	}
    return (ra)
}
function right_declination_radians(ec_oblq, ec_lng){
	return Math.asin(Math.sin(ec_oblq) * Math.sin(ec_lng));
}
function greenwich_mean_sidereal_time_hours(time:number, hour:number){
	    return ((6.697375 + 0.0657098242 * time + hour) % 24)
}
function local_mean_sidereal_time_radians(gmst:number, lng:number){
	    return toRadians(15 * ((gmst + lng / 15.0) % 24));
}
function hour_angle_radians(lmst, ra){
	    return (((lmst - ra + Math.PI) % (2 * Math.PI)) - Math.PI);
}
function elevation_radians(lat, dec, ha){
	    return (Math.asin(Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha)));
}
function solar_azimuth_radians_charlie( lat, dec, ha){
	let zenithAngle = Math.acos(Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(ha));
    let az = Math.acos((Math.sin(lat) * Math.cos(zenithAngle) - Math.sin(dec)) / (Math.cos(lat) * Math.sin(zenithAngle)));
    if(ha > 0){
        az = az + Math.PI;
	}
    else{
        az = (3 * Math.PI - az) % (2 * Math.PI);
	}
    return (az);
}
export function calc_sun_position(time:Date, lat:number, lng:number){
	let jd_time =  calc_time(time);
	console.log('hour', jd_time);
	let hour = time.getHours() + time.getMinutes()/60 + time.getSeconds()/3600;
	console.log('hour', hour);
	//mean long
	let mean_long = get_mean_long_degrees(jd_time);
	console.log('mean_lng',mean_long);
	//mean anomaly
	let mean_anom = get_mean_anomaly_rads(jd_time);
	console.log('mean_anom',mean_anom);
	//ecliptic long rads
	let ecliptic_long = get_ecliptic_long_rads(mean_long, mean_anom);
	console.log('ecl lng:',ecliptic_long);
	//eclipcitc obliq rads
	let ecliptic_obliquity = get_ecliptic_obliquity_rads(jd_time);
	console.log('ecl obl:',ecliptic_obliquity);
	// Celestial coordinates
    let ra = right_ascension_radians(ecliptic_obliquity, ecliptic_long)
	console.log('ra:',ra);
    let dec = right_declination_radians(ecliptic_obliquity, ecliptic_long)
	console.log('dec_rad:',dec);
	console.log('dec_deg:',toDegrees(dec));
    // Local coordinates
    let gmst = greenwich_mean_sidereal_time_hours(jd_time, hour)  
    let lmst =local_mean_sidereal_time_radians(gmst, lng)
    // Hour angle
    let ha = hour_angle_radians(lmst, ra)
    // Latitude to radians
    let lat_radians = toRadians(lat)
    // Azimuth and elevation
    let el = elevation_radians(lat_radians, dec, ha)
    //azJ = solarAzimuthRadiansJosh(lat, dec, ha, el)
    let azC = solar_azimuth_radians_charlie(lat_radians, dec, ha)
	return {"angle": toDegrees(el), "azimuth": toDegrees(azC)};
}
let date = new Date("2021-11-14 12:00:00");
console.log(date);
console.log(date.getHours());
let data = calc_sun_position(date, 40, -105);
console.log("data:",data);
