import  {spa_data, FUNC_CODES, TERMS, TERMX, TERMS2, JD, SUN}  from './types';
const PI = 3.1415926535897932384626433832795028841971;
const SUN_RADIUS = 0.26667;
const L_COUNT = 6;
const B_COUNT = 2;
const R_COUNT = 5;
const Y_COUNT = 63;

const L_MAX_SUBCOUNT = 64;
const B_MAX_SUBCOUNT = 5;
const R_MAX_SUBCOUNT = 40;

let TERM_Y_COUNT, TERM_X_COUNT;

const l_subcount = [4, 34, 20, 7, 3, 1];
const b_subcount = [5, 2];
const r_subcount = [40, 10, 6, 2, 1];

const L_TERMS =
[
    [
        [175347046.0,0,0],
        [3341656.0,4.6692568,6283.07585],
        [34894.0,4.6261,12566.1517],
        [3497.0,2.7441,5753.3849],
        [3418.0,2.8289,3.5231],
        [3136.0,3.6277,77713.7715],
        [2676.0,4.4181,7860.4194],
        [2343.0,6.1352,3930.2097],
        [1324.0,0.7425,11506.7698],
        [1273.0,2.0371,529.691],
        [1199.0,1.1096,1577.3435],
        [990,5.233,5884.927],
        [902,2.045,26.298],
        [857,3.508,398.149],
        [780,1.179,5223.694],
        [753,2.533,5507.553],
        [505,4.583,18849.228],
        [492,4.205,775.523],
        [357,2.92,0.067],
        [317,5.849,11790.629],
        [284,1.899,796.298],
        [271,0.315,10977.079],
        [243,0.345,5486.778],
        [206,4.806,2544.314],
        [205,1.869,5573.143],
        [202,2.458,6069.777],
        [156,0.833,213.299],
        [132,3.411,2942.463],
        [126,1.083,20.775],
        [115,0.645,0.98],
        [103,0.636,4694.003],
        [102,0.976,15720.839],
        [102,4.267,7.114],
        [99,6.21,2146.17],
        [98,0.68,155.42],
        [86,5.98,161000.69],
        [85,1.3,6275.96],
        [85,3.67,71430.7],
        [80,1.81,17260.15],
        [79,3.04,12036.46],
        [75,1.76,5088.63],
        [74,3.5,3154.69],
        [74,4.68,801.82],
        [70,0.83,9437.76],
        [62,3.98,8827.39],
        [61,1.82,7084.9],
        [57,2.78,6286.6],
        [56,4.39,14143.5],
        [56,3.47,6279.55],
        [52,0.19,12139.55],
        [52,1.33,1748.02],
        [51,0.28,5856.48],
        [49,0.49,1194.45],
        [41,5.37,8429.24],
        [41,2.4,19651.05],
        [39,6.17,10447.39],
        [37,6.04,10213.29],
        [37,2.57,1059.38],
        [36,1.71,2352.87],
        [36,1.78,6812.77],
        [33,0.59,17789.85],
        [30,0.44,83996.85],
        [30,2.74,1349.87],
        [25,3.16,4690.48]
    ],
    [
        [628331966747.0,0,0],
        [206059.0,2.678235,6283.07585],
        [4303.0,2.6351,12566.1517],
        [425.0,1.59,3.523],
        [119.0,5.796,26.298],
        [109.0,2.966,1577.344],
        [93,2.59,18849.23],
        [72,1.14,529.69],
        [68,1.87,398.15],
        [67,4.41,5507.55],
        [59,2.89,5223.69],
        [56,2.17,155.42],
        [45,0.4,796.3],
        [36,0.47,775.52],
        [29,2.65,7.11],
        [21,5.34,0.98],
        [19,1.85,5486.78],
        [19,4.97,213.3],
        [17,2.99,6275.96],
        [16,0.03,2544.31],
        [16,1.43,2146.17],
        [15,1.21,10977.08],
        [12,2.83,1748.02],
        [12,3.26,5088.63],
        [12,5.27,1194.45],
        [12,2.08,4694],
        [11,0.77,553.57],
        [10,1.3,6286.6],
        [10,4.24,1349.87],
        [9,2.7,242.73],
        [9,5.64,951.72],
        [8,5.3,2352.87],
        [6,2.65,9437.76],
        [6,4.67,4690.48]
    ],
    [
        [52919.0,0,0],
        [8720.0,1.0721,6283.0758],
        [309.0,0.867,12566.152],
        [27,0.05,3.52],
        [16,5.19,26.3],
        [16,3.68,155.42],
        [10,0.76,18849.23],
        [9,2.06,77713.77],
        [7,0.83,775.52],
        [5,4.66,1577.34],
        [4,1.03,7.11],
        [4,3.44,5573.14],
        [3,5.14,796.3],
        [3,6.05,5507.55],
        [3,1.19,242.73],
        [3,6.12,529.69],
        [3,0.31,398.15],
        [3,2.28,553.57],
        [2,4.38,5223.69],
        [2,3.75,0.98]
    ],
    [
        [289.0,5.844,6283.076],
        [35,0,0],
        [17,5.49,12566.15],
        [3,5.2,155.42],
        [1,4.72,3.52],
        [1,5.3,18849.23],
        [1,5.97,242.73]
    ],
    [
        [114.0,3.142,0],
        [8,4.13,6283.08],
        [1,3.84,12566.15]
    ],
    [
        [1,3.14,0]
    ]
];
const B_TERMS=
[
    [
        [280.0,3.199,84334.662],
        [102.0,5.422,5507.553],
        [80,3.88,5223.69],
        [44,3.7,2352.87],
        [32,4,1577.34]
    ],
    [
        [9,3.9,5507.55],
        [6,1.73,5223.69]
    ]
];
const R_TERMS=
[
    [
        [100013989.0,0,0],
        [1670700.0,3.0984635,6283.07585],
        [13956.0,3.05525,12566.1517],
        [3084.0,5.1985,77713.7715],
        [1628.0,1.1739,5753.3849],
        [1576.0,2.8469,7860.4194],
        [925.0,5.453,11506.77],
        [542.0,4.564,3930.21],
        [472.0,3.661,5884.927],
        [346.0,0.964,5507.553],
        [329.0,5.9,5223.694],
        [307.0,0.299,5573.143],
        [243.0,4.273,11790.629],
        [212.0,5.847,1577.344],
        [186.0,5.022,10977.079],
        [175.0,3.012,18849.228],
        [110.0,5.055,5486.778],
        [98,0.89,6069.78],
        [86,5.69,15720.84],
        [86,1.27,161000.69],
        [65,0.27,17260.15],
        [63,0.92,529.69],
        [57,2.01,83996.85],
        [56,5.24,71430.7],
        [49,3.25,2544.31],
        [47,2.58,775.52],
        [45,5.54,9437.76],
        [43,6.01,6275.96],
        [39,5.36,4694],
        [38,2.39,8827.39],
        [37,0.83,19651.05],
        [37,4.9,12139.55],
        [36,1.67,12036.46],
        [35,1.84,2942.46],
        [33,0.24,7084.9],
        [32,0.18,5088.63],
        [32,1.78,398.15],
        [28,1.21,6286.6],
        [28,1.9,6279.55],
        [26,4.59,10447.39]
    ],
    [
        [103019.0,1.10749,6283.07585],
        [1721.0,1.0644,12566.1517],
        [702.0,3.142,0],
        [32,1.02,18849.23],
        [31,2.84,5507.55],
        [25,1.32,5223.69],
        [18,1.42,1577.34],
        [10,5.91,10977.08],
        [9,1.42,6275.96],
        [9,0.27,5486.78]
    ],
    [
        [4359.0,5.7846,6283.0758],
        [124.0,5.579,12566.152],
        [12,3.14,0],
        [9,3.63,77713.77],
        [6,1.87,5573.14],
        [3,5.47,18849.23]
    ],
    [
        [145.0,4.273,6283.076],
        [7,3.92,12566.15]
    ],
    [
        [4,2.56,6283.08]
    ]
];
const Y_TERMS =
[
    [0,0,0,0,1],
    [-2,0,0,2,2],
    [0,0,0,2,2],
    [0,0,0,0,2],
    [0,1,0,0,0],
    [0,0,1,0,0],
    [-2,1,0,2,2],
    [0,0,0,2,1],
    [0,0,1,2,2],
    [-2,-1,0,2,2],
    [-2,0,1,0,0],
    [-2,0,0,2,1],
    [0,0,-1,2,2],
    [2,0,0,0,0],
    [0,0,1,0,1],
    [2,0,-1,2,2],
    [0,0,-1,0,1],
    [0,0,1,2,1],
    [-2,0,2,0,0],
    [0,0,-2,2,1],
    [2,0,0,2,2],
    [0,0,2,2,2],
    [0,0,2,0,0],
    [-2,0,1,2,2],
    [0,0,0,2,0],
    [-2,0,0,2,0],
    [0,0,-1,2,1],
    [0,2,0,0,0],
    [2,0,-1,0,1],
    [-2,2,0,2,2],
    [0,1,0,0,1],
    [-2,0,1,0,1],
    [0,-1,0,0,1],
    [0,0,2,-2,0],
    [2,0,-1,2,1],
    [2,0,1,2,2],
    [0,1,0,2,2],
    [-2,1,1,0,0],
    [0,-1,0,2,2],
    [2,0,0,2,1],
    [2,0,1,0,0],
    [-2,0,2,2,2],
    [-2,0,1,2,1],
    [2,0,-2,0,1],
    [2,0,0,0,1],
    [0,-1,1,0,0],
    [-2,-1,0,2,1],
    [-2,0,0,0,1],
    [0,0,2,2,1],
    [-2,0,2,0,1],
    [-2,1,0,2,1],
    [0,0,1,-2,0],
    [-1,0,1,0,0],
    [-2,1,0,0,0],
    [1,0,0,0,0],
    [0,0,1,2,0],
    [0,0,-2,2,2],
    [-1,-1,1,0,0],
    [0,1,1,0,0],
    [0,-1,1,2,2],
    [2,-1,-1,2,2],
    [0,0,3,2,2],
    [2,-1,0,2,2],
];

const PE_TERMS=[
	[-171996,-174.2,92025,8.9],
	[-13187,-1.6,5736,-3.1],
	[-2274,-0.2,977,-0.5],
	[2062,0.2,-895,0.5],
	[1426,-3.4,54,-0.1],
	[712,0.1,-7,0],
	[-517,1.2,224,-0.6],
	[-386,-0.4,200,0],
	[-301,0,129,-0.1],
	[217,-0.5,-95,0.3],
	[-158,0,0,0],
	[129,0.1,-70,0],
	[123,0,-53,0],
	[63,0,0,0],
	[63,0.1,-33,0],
	[-59,0,26,0],
	[-58,-0.1,32,0],
	[-51,0,27,0],
	[48,0,0,0],
	[46,0,-24,0],
	[-38,0,16,0],
	[-31,0,13,0],
	[29,0,0,0],
	[29,0,-12,0],
	[26,0,0,0],
	[-22,0,0,0],
	[21,0,-10,0],
	[17,-0.1,0,0],
	[16,0,-8,0],
	[-16,0.1,7,0],
	[-15,0,9,0],
	[-13,0,7,0],
	[-12,0,6,0],
	[11,0,0,0],
	[-10,0,5,0],
	[-8,0,3,0],
	[7,0,-3,0],
	[-7,0,0,0],
	[-7,0,3,0],
	[-7,0,3,0],
	[6,0,0,0],
	[6,0,-3,0],
	[6,0,-3,0],
	[-6,0,3,0],
	[-6,0,3,0],
	[5,0,0,0],
	[-5,0,3,0],
	[-5,0,3,0],
	[-5,0,3,0],
	[4,0,0,0],
	[4,0,0,0],
	[4,0,0,0],
	[-4,0,0,0],
	[-4,0,0,0],
	[-4,0,0,0],
	[3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
	[-3,0,0,0],
    ];

function rad2deg(rad){
	return (180.0/PI) * rad;
}
function deg2rad(deg){
	return (PI/180.0)*deg;
}
function integer(val){
	return Math.round(val);
}
function limit_degrees(deg){
	let limited;
	deg /= 360.0;
	limited = 360.0 * (deg - Math.floor(deg));
	if(limited < 0){
		limited +=360.0;
	}
	return limited;
}
function limit_degrees180pm(deg){
	let limited;
	deg /=360.0;
	limited  = 360.0*(deg-Math.floor(deg));
	if(limited < -180.0){
		limited += 360.0;
	}
	else if(limited > 180.0){
		limited -= 360.0
	}
	return limited;
}
function limit_degrees180(deg){
	let limited;
	deg /= 180.0;
	limited = 180.0*(deg - Math.floor(deg));
	if(limited < 0){
		limited += 180.0;
	}
	return limited;
}
function limit_zero2one(value){
	let limited;
	limited = value - Math.floor(value);
	if(limited < 0){
		limited += 1.0;
	}
	return limited;
}
function limit_minutes(minutes){
	let limited=minutes;
	if(limited < -20.0){
		limited += 1440.0;
	}
	else if (limited > 20.0){
		limited -= 1440.0;
	}
	return limited;
}
function dayfrac_to_local_hr(dayfrac, timezone){
	return 24.0*limit_zero2one(dayfrac+timezone/24.0);
}
function third_order_polynomial(a, b, c, d, x){
	return ((a*x+ b)*x + c)*x + d;
}
function validate_inputs(spa){
	if ((spa.month       < 1    ) || (spa.month       > 12  )) return 2;
	if ((spa.year        < -2000) || (spa.year        > 6000)) return 1;
	if ((spa.day         < 1    ) || (spa.day         > 31  )) return 3;
	if ((spa.hour        < 0    ) || (spa.hour        > 24  )) return 4;
	if ((spa.minute      < 0    ) || (spa.minute      > 59  )) return 5;
	if ((spa.second      < 0    ) || (spa.second      >=60  )) return 6;
	if ((spa.pressure    < 0    ) || (spa.pressure    > 5000)) return 12;
	if ((spa.temperature <= -273) || (spa.temperature > 6000)) return 13;
	if ((spa.delta_ut1   <= -1  ) || (spa.delta_ut1   >= 1  )) return 17;
	    if ((spa.hour        == 24  ) && (spa.minute      > 0   )) return 5;
	if ((spa.hour        == 24  ) && (spa.second      > 0   )) return 6;
    
	if (Math.abs(spa.delta_t)       > 8000    ) return 7;
	if (Math.abs(spa.timezone)      > 18      ) return 8;
	if (Math.abs(spa.longitude)     > 180     ) return 9;
	if (Math.abs(spa.latitude)      > 90      ) return 10;
	if (Math.abs(spa.atmos_refract) > 5       ) return 16;
	if (     spa.elevation      < -6500000) return 11;
	if ((spa.function == FUNC_CODES.SPA_ZA_INC) || (spa.function == FUNC_CODES.SPA_ALL))
    	{
		if (Math.abs(spa.slope)         > 360) return 14;
		if (Math.abs(spa.azm_rotation)  > 360) return 15;
	}

	return 0;
}
function julian_day (year, month, day, hour, minute, second, dut1, tz){
	let day_decimal:number, julian_day:number, a:number;
	day_decimal = day+(hour-tz+(minute+(second+dut1)/60.0)/60.0)/24.0;
	if(month < 3) {
		month += 12;
		year--;
	}
	julian_day = integer(365.25*(year+4716.0))+ integer(30.6001*(month+1)) + day_decimal - 1524.5;
	if(julian_day>2299160.0){
		a=integer(year/100);
		julian_day+=(2-a+integer(a/4));
	}
	return julian_day;
}
function julian_century(jd){
	return (jd-2451545.0)/36524.0;
}
function julian_ephemeris_day(jd, delta_t){
	return jd+delta_t/86400.0;
}
function julian_ephemeris_century(jde){
	return (jde-2451545.0)/36525.0;
}
function julian_ephemeris_millennium(jce){
	return (jce/10.0);
}
//might need count back
function earth_periodic_term_summation(terms:Array<Array<number>>, jme){
	let sum = 0;
	terms.forEach((term) => {
		sum += term[0]*Math.cos(term[1]+ term[2]*jme);
	});	
	return sum;
}
function earth_values(term_sum:Array<number>, jme){
	let sum = 0;
	term_sum.forEach((term, i) =>{
		sum += term*Math.pow(jme, i);
		i+=1;
	});
	sum /= Math.pow(1,8);
	return sum;
}
function earth_heliocentric_longitude(jme){
	let sum:Array<number> = [];
	for(let i = 0; i < L_COUNT; i++){
		sum.push(earth_periodic_term_summation(L_TERMS[i], jme)); 
	}
	return limit_degrees(rad2deg(earth_values(sum, jme)));
}
function earth_heliocentric_latitude(jme){
	let sum:Array<number> = [];
	let i = 0;
	for(i=0; i < B_COUNT; i++){
		sum.push(earth_periodic_term_summation(B_TERMS[i], jme));
	}
	return rad2deg(earth_values(sum, jme));
}
function earth_radius_vector(jme){
	let sum:Array<number> = [];
	for(let i = 0; i < R_COUNT; i++){
		sum.push(earth_periodic_term_summation(R_TERMS[i], jme));
	}
	return earth_values(sum, jme);
}
function geocentric_longitude(l){
	let theta = l + 180.0;
	if(theta >= 360.0){
		theta -= 360.0;
	}
	return theta;
}
function geocentric_latitude(b){
	return -b;
}
function mean_elongation_moon_sun(jce){
	return third_order_polynomial(1.0/180474.0, -0.0019142, 445267.11148, 297.85036, jce);
}
function mean_anomaly_sun(jce){
	return third_order_polynomial(-1.0/300000.0, -0.0001603, 35999.05034, 357.52772, jce);
}
function mean_anomaly_moon(jce){
return third_order_polynomial(1.0/56250.0, 0.0086972, 477198.867398, 134.96298, jce);
}
function argument_latitude_moon(jce){
    return third_order_polynomial(1.0/327270.0, -0.0036825, 483202.017538, 93.27191, jce);
}
function ascending_longitude_moon(jce){
    return third_order_polynomial(1.0/327270.0, -0.0036825, 483202.017538, 93.27191, jce);
}
function xy_term_summation(i, x:Array<number>){
	let sum = 0;
	for(let j = 0; j < TERM_Y_COUNT; j++){
		sum+=x[j]*Y_TERMS[i][j];
	}
	return sum;
}
//returns del_psi, del_epsilon
function nutation_longitude_and_obliquity(jce, x:Array<number>, del_psi, del_epsilon){
	let xy_term_sum, sum_psi, sum_epsilon = 0;
	for(let i = 0; i < Y_COUNT; i++){
		xy_term_sum = deg2rad(xy_term_summation(i, x));
		sum_psi += (PE_TERMS[i][0] + jce*PE_TERMS[i][1]) * Math.sin(xy_term_sum);
		sum_epsilon += (PE_TERMS[i][0] + jce*PE_TERMS[i][1])*Math.cos(xy_term_sum);
	}
	del_psi     = sum_psi     / 36000000.0;
	del_epsilon = sum_epsilon / 36000000.0;
	return [del_psi,del_epsilon]
}
function ecliptic_mean_obliquity(jme){
	let u = jme/10.0;
	return 84381.448 + u*(-4680.93 + u*(-1.55 + u*(1999.25 + u*(-51.38 + u*(-249.67 + u*(  -39.05 + u*( 7.12 + u*(  27.87 + u*(  5.79 + u*2.45)))))))));
}
function ecliptic_true_obliquity(delta_epsilon, epsilon0){
	return delta_epsilon + epsilon0/3600.0;
}
function aberration_correction(r){
	return -20.4898 / (3600.0*r);
}
function apparent_sun_longitude(theta, delta_psi, delta_tau){
	return theta + delta_psi + delta_tau;
}
function greenwich_mean_sidereal_time(jd, jc){
	return limit_degrees(280.46061837 + 360.98564736629 * (jd - 2451545.0) + jc*jc*(0.000387933 - jc/38710000.0));
}
function greenwich_sidereal_time(nu0, delta_psi, epsilon){
	return nu0 + delta_psi*Math.cos(deg2rad(epsilon));
}
function geocentric_right_ascension(lamda, epsilon, beta){
	let lamda_rad   = deg2rad(lamda);
	let epsilon_rad = deg2rad(epsilon);
	return limit_degrees(rad2deg(Math.atan2(Math.sin(lamda_rad)*Math.cos(epsilon_rad) - Math.tan(deg2rad(beta))*Math.sin(epsilon_rad), Math.cos(lamda_rad))));
}
function geocentric_declination(beta, epsilon, lamda){
	let beta_rad    = deg2rad(beta);
	let epsilon_rad = deg2rad(epsilon);

	return rad2deg(Math.asin(Math.sin(beta_rad)*Math.cos(epsilon_rad) + Math.cos(beta_rad)*Math.sin(epsilon_rad)*Math.sin(deg2rad(lamda))));
}
function observer_hour_angle(nu, longitude, alpha_deg){
	return limit_degrees(nu + longitude - alpha_deg);
}
function sun_equitorial_horizontal_parallax(r){
	return 8.794 / (3600.0 * r);
}
function right_acension_parallax_and_topocentric_dec(latitude, elevation, xi, h, delta){
	let lat_rad = deg2rad(latitude);
	let xi_rad = deg2rad(xi);
	let h_rad = deg2rad(h);
	let delta_rad = deg2rad(delta);
	let u = Math.atan(0.99664719 * Math.tan(lat_rad));
	let y = Math.atan(0.99664719 * Math.sin(u) + elevation * Math.sin(lat_rad)/6378140.0);
	let x = Math.cos(u) + elevation*Math.cos(lat_rad)/6378140.0;
	let delta_alpha_rad = Math.atan2(- x*Math.sin(xi_rad) *Math.sin(h_rad), Math.cos(delta_rad) - x*Math.sin(xi_rad) *Math.cos(h_rad));
	let delta_prime = rad2deg(Math.atan2((Math.sin(delta_rad) - y*Math.sin(xi_rad))*Math.cos(delta_alpha_rad), Math.cos(delta_rad) - x*Math.sin(xi_rad) *Math.cos(h_rad)));
	let delta_alpha = rad2deg(delta_alpha_rad);
	return [delta_prime, delta_alpha];
}
function topocentric_right_ascension(alpha_deg, delta_alpha){
	return alpha_deg + delta_alpha;
}
function topocentric_local_hour_angle(h, delta_alpha){
	return h - delta_alpha;
}
function topocentric_elevation_angle(latitude, delta_prime, h_prime){
	let lat_rad = deg2rad(latitude);
	let delta_prime_rad = deg2rad(delta_prime);
	return rad2deg(Math.asin(Math.sin(lat_rad)*Math.sin(delta_prime_rad) + Math.cos(lat_rad)*Math.cos(delta_prime_rad) * Math.cos(deg2rad(h_prime))));
}
function atmospheric_refraction_correction(pressure, temperature, atmos_refract, e0){
	let del_e = 0;
	if (e0 >= -1*(SUN_RADIUS + atmos_refract)){
		del_e = (pressure / 1010.0) * (283.0 / (273.0 + temperature)) * 1.02 / (60.0 * Math.tan(deg2rad(e0 + 10.3/(e0 + 5.11))));
	}
	return del_e;
}
function topocentric_elevation_angle_corrected(e0, delta_e){
	return e0 + delta_e;
}
function topocentric_zenith_angle(e){
	return 90.0 -e;
}
function topocentric_azimuth_angle_astro(h_prime, latitude, delta_prime){
	let h_prime_rad=deg2rad(h_prime);
	let lat_rad = deg2rad(latitude);
	return limit_degrees(rad2deg(Math.atan2(Math.sin(h_prime_rad), Math.cos(h_prime_rad)*Math.sin(lat_rad) - Math.tan(deg2rad(delta_prime))*Math.cos(lat_rad))));
}
function topocentric_azimuth_angle(azimuth_astro){
	return limit_degrees(azimuth_astro+180.0);
}
function surface_incidence_angle(zenith, azimuth_astro, azm_rotation, slope){
	let zenith_rad = deg2rad(zenith);
	let slope_rad = deg2rad(slope);
	return rad2deg(Math.acos(Math.cos(zenith_rad)*Math.cos(slope_rad)  + Math.sin(slope_rad )*Math.sin(zenith_rad) * Math.cos(deg2rad(azimuth_astro - azm_rotation))));
}
function sun_mean_longitude(jme){
	return limit_degrees(280.4664567 + jme*(360007.6982779 + jme*(0.03032028 + jme*(1/49931.0 + jme*(-1/15300.0 + jme*(-1/2000000.0))))));
}
function eot(m, alpha, del_psi, epsilon){
	return limit_minutes(4.0*(m - 0.0057183 - alpha + del_psi*Math.cos(deg2rad(epsilon))));
}
function approx_sun_transit_time(alpha_zero, longitude, nu){
    return (alpha_zero - longitude - nu) / 360.0;
}
function sun_hour_angle_at_rise_set(latitude,delta_zero, h0_prime){
	let h0 = -99999;
	const latitude_rad = deg2rad(latitude);
	const delta_zero_rad = deg2rad(delta_zero);
	const argument = (Math.sin(deg2rad(h0_prime)) - Math.sin(latitude_rad)*Math.sin(delta_zero_rad)) / (Math.cos(latitude_rad)*Math.cos(delta_zero_rad));
	if (Math.abs(argument) <= 1) h0 = limit_degrees180(rad2deg(Math.acos(argument)));
	return h0;
}
function approx_sun_rise_and_set(m_rts, h0){
	const h0_dfrac = h0/360.0;
	m_rts.sun_rise = limit_zero2one(m_rts.sun_transit - h0_dfrac);
	m_rts.sun_set = limit_zero2one(m_rts.sun_transit + h0_dfrac); 
	m_rts.sun_transit = limit_zero2one(m_rts.sun_transit);
}
function rts_alpha_delta_prime(ad, n){
	let a = ad.jd_zero - ad.jd_zero;
	let b = ad.jd_plus - ad.jd_zero;
	if(Math.abs(a) >= 2.0) a = limit_zero2one(a);
	if(Math.abs(a) >= 2.0) b = limit_zero2one(b);

	return ad.jd_zero + n * (a + b+ (b-a) * n) /2.0;
}
function rts_sun_altitude(latitude, delta_prime, h_prime){
	const latitude_rad = deg2rad(latitude);
	const delta_prime_rad = deg2rad(delta_prime);
	return rad2deg(Math.asin(Math.sin(latitude_rad)*Math.sin(delta_prime_rad) + Math.cos(latitude_rad)*Math.cos(delta_prime_rad)*Math.cos(deg2rad(h_prime))));
}
function sun_rise_and_set(m_rts, h_rts, delta_prime, latitude, h_prime, h0_prime, sun){
	return m_rts[sun] + (h_rts[sun] - h0_prime) / (360.0*Math.cos(deg2rad(delta_prime[sun]))*Math.cos(deg2rad(latitude))*Math.sin(deg2rad(h_prime[sun])));
}
function calculate_geocentric_sun_right_ascension_and_declination(spa:spa_data){
	let x = [];
	spa.jc = julian_century(spa.jd);
	spa.jde = julian_ephemeris_day(spa.jd, spa.delta_t);
	spa.jce = julian_ephemeris_century(spa.jde);
	spa.jme = julian_ephemeris_millennium(spa.jce);

	spa.l = earth_heliocentric_longitude(spa.jme);
	spa.b = earth_heliocentric_latitude(spa.jme);
	spa.r = earth_radius_vector(spa.jme);

	spa.theta = geocentric_longitude(spa.l);
	spa.beta = geocentric_latitude(spa.b);

	spa.x0 = mean_elongation_moon_sun(spa.jce);
	x.push(spa.x0);
	
	spa.x1 = mean_anomaly_sun(spa.jce);
	x.push(spa.x1);

	spa.x2 = mean_anomaly_moon(spa.jce);
	x.push(spa.x2);

	spa.x3 = argument_latitude_moon(spa.jce);
	x.push(spa.x3);

	spa.x4 = ascending_longitude_moon(spa.jce);
	x.push(spa.x4);

	nutation_longitude_and_obliquity(spa.jce, x, spa.del_psi, spa.del_epsilon);
	
	spa.epsilon0 = ecliptic_mean_obliquity(spa.jme);
	spa.epsilon = ecliptic_true_obliquity(spa.del_epsilon, spa.epsilon0);
	
	spa.del_tau = aberration_correction(spa.r);
	spa.lamda = apparent_sun_longitude(spa.theta, spa.del_psi, spa.del_tau);
	spa.nu0 = greenwich_mean_sidereal_time(spa.jd, spa.jc);
	spa.nu = greenwich_sidereal_time( spa.nu0, spa.del_psi, spa.epsilon);

	spa.alpha = geocentric_right_ascension(spa.lamda, spa.epsilon, spa.lamda);
	spa.delta = geocentric_declination(spa.beta, spa.epsilon, spa.lamda);
}

function calculate_eot_and_sun_rise_transit_set(spa:spa_data){
	let sun_rts:spa_data;
	let nu, m, h0, n, i;
	let alpha, delta, m_rts, nu_rts, h_rts, alpha_prime, delta_prime, h_prime = [];
	let h0_prime = -1 *(SUN_RADIUS + spa.atmos_refract);
	sun_rts = spa;
	m = sun_mean_longitude(spa.jme);
	spa.eot = eot(m, spa.alpha, spa.del_psi, spa.epsilon);
	
	sun_rts.hour = 0;
	sun_rts.minute = 0;
	sun_rts.second = 0;

	sun_rts.delta_ut1 = 0.0;
	sun_rts.timezone = 0.0;

	sun_rts.jd = julian_day (sun_rts.year, sun_rts.month, sun_rts.day, sun_rts.hour, sun_rts.minute, sun_rts.second, sun_rts.delta_ut1, sun_rts.timezone);
	calculate_geocentric_sun_right_ascension_and_declination(sun_rts);	
	nu = sun_rts.nu;
	sun_rts.delta_t = 0;
	sun_rts.jd--;
	for(let i = 0; i < JD.JD_COUNT; i++){
		calculate_geocentric_sun_right_ascension_and_declination(sun_rts);
		alpha[i] = sun_rts.alpha;
		delta[i] = sun_rts.delta;
		sun_rts.jd++;
	}	
	m_rts[SUN.SUN_TRANSIT] = approx_sun_transit_time(alpha[JD.JD_ZERO], spa.longitude, nu)
	h0 = sun_hour_angle_at_rise_set(spa.latitude, delta[JD.JD_ZERO], h0_prime);
	if(h0>=0){
		approx_sun_rise_and_set(m_rts, h0);
		for( let j = 0; j < SUN.SUN_COUNT; j++){
		nu_rts[j] = nu + 360.985647*m_rts[j];
		n = m_rts[j] + spa.delta_t/86400.0;
		alpha_prime[j] = rts_alpha_delta_prime(alpha, n);
		delta_prime[j] = rts_alpha_delta_prime(delta, n);

		h_prime[j] = limit_degrees180pm(nu_rts[j] + spa.longitude - alpha_prime[j]);
		h_rts[j] = rts_sun_altitude(spa.latitude,delta_prime[j], h_prime[j]);
	}
	spa.srha = h_prime[SUN.SUN_RISE];
	spa.ssha = h_prime[SUN.SUN_SET];
	spa.sta = h_rts[SUN.SUN_TRANSIT];

	spa.suntransit = dayfrac_to_local_hr(m_rts[SUN.SUN_TRANSIT] -h_prime[SUN.SUN_TRANSIT] /360.0, spa.timezone);
	spa.sunrise = dayfrac_to_local_hr(sun_rise_and_set(m_rts, h_rts, delta_prime, spa.latitude, h_prime, h0_prime, SUN.SUN_RISE), spa.timezone);
	spa.sunset = dayfrac_to_local_hr(sun_rise_and_set(m_rts, h_rts, delta_prime, spa.latitude, h_prime, h0_prime, SUN.SUN_SET), spa.timezone);
} else {
	spa.srha = -99999;
	spa.ssha = -99999;
	spa.sta = -99999;
	spa.suntransit = -99999;
	spa.sunrise = -99999;
	spa.sunset = -99999;
}
}
function spa_calculate(spa:spa_data){
	let result = validate_inputs(spa);
	if(result === 0){
		//this is off by 2
		spa.jd = julian_day (spa.year, spa.month, spa.day, spa.hour, spa.minute, spa.second, spa.delta_ut1, spa.timezone);
		calculate_geocentric_sun_right_ascension_and_declination(spa);	
		spa.h = observer_hour_angle(spa.nu, spa.longitude, spa.alpha);
		spa.xi = sun_equitorial_horizontal_parallax(spa.r);

		let out = right_acension_parallax_and_topocentric_dec(spa.latitude, spa.elevation, spa.xi, spa.h, spa.delta);
		spa.del_alpha = out[0];
		spa.delta_prime = out[1];

		spa.alpha_prime = topocentric_right_ascension(spa.alpha, spa.del_alpha);
		spa.h_prime = topocentric_local_hour_angle(spa.h, spa.del_alpha);
		spa.e0 = topocentric_elevation_angle(spa.latitude, spa.delta_prime, spa.h_prime);
		spa.del_e = atmospheric_refraction_correction(spa.pressure, spa.temperature, spa.atmos_refract, spa.e0);
		spa.e = topocentric_elevation_angle_corrected(spa.e0, spa.del_e);

		spa.zenith = topocentric_zenith_angle(spa.e);
		spa.azimuth_astro = topocentric_azimuth_angle_astro(spa.h_prime, spa.latitude, spa.delta_prime);
		spa.azimuth = topocentric_azimuth_angle(spa.azimuth_astro);

		if(spa.function === FUNC_CODES.SPA_ZA_INC || spa.function === FUNC_CODES.SPA_ALL) {
			spa.incidence = surface_incidence_angle(spa.zenith, spa.azimuth_astro, spa.azm_rotation, spa.slope);
		}
		if(spa.function === FUNC_CODES.SPA_ZA_RTS || spa.function === FUNC_CODES.SPA_ALL){
			calculate_eot_and_sun_rise_transit_set
		}
	}
	return result;
}


function test(){
	let input_spa:spa_data = {
		year: 2003,
		month: 10,
		day: 17,
		hour: 12,
		minute: 30,
		second: 30,
		pressure: 820,
		temperature: 11,
		delta_ut1: 0,
		delta_t: 67,
		timezone: -7.0,
		longitude: -105.1786,
		latitude: 39.742476,
		atmos_refract: 0.5667,
		elevation: 1830.14,
		function: FUNC_CODES.SPA_ALL,
		slope: 30,
		azm_rotation: -10,
	};
	let result = spa_calculate(input_spa);
	console.log("res:",input_spa);
	let min = 60.0*(input_spa.sunrise - Math.round(input_spa.sunrise));
	let sec = 60.0*(min - Math.round(min));
	console.log("Sunrise:Local Time: "+(input_spa.sunrise)+":"+min+":"+sec);

	min = 60.0*(input_spa.sunset - Math.round(input_spa.sunset));
	sec = 60.0*(min - Math.round(min));
	console.log("Sunset:  Local Time: "+(input_spa.sunset)+':'+ min+":"+sec);
}
test();

/////////////////////////////////////////////
// The output of this program should be:
//
//Julian Day:    2452930.312847 <- this is good
//L:             2.401826e+01 degrees
//B:             -1.011219e-04 degrees
//R:             0.996542 AU
//H:             11.105902 degrees
//Delta Psi:     -3.998404e-03 degrees
//Delta Epsilon: 1.666568e-03 degrees
//Epsilon:       23.440465 degrees
//Zenith:        50.111622 degrees
//Azimuth:       194.340241 degrees
//Incidence:     25.187000 degrees
//Sunrise:       06:12:43 Local Time
//Sunset:        17:20:19 Local Time
//
/////////////////////////////////////////////