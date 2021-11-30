export enum FUNC_CODES{ SPA_ZA, SPA_ZA_INC, SPA_ZA_RTS, SPA_ALL};
export enum TERMS{TERM_A, TERM_B, TERM_C, TERM_COUNT};
export enum TERMX{TERM_X0, TERM_X1, TERM_X2, TERM_X4, TERM_X_COUNT};
export enum TERMS2{TERM_PSI_A, TERM_PSI_B, TERM_EPS_C, TERM_EPS_D, TERM_PE_COUNT};
export enum JD{JD_MINUS, JD_ZERO, JD_PLUS, JD_COUNT};
export enum SUN{SUN_TRANSIT, SUN_RISE, SUN_SET, SUN_COUNT};


export interface spa_data {
	//input
	year:number,
	month:number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	pressure: number,
	temperature: number,
	delta_ut1: number,
	delta_t: number,
	timezone: number,
	longitude: number,
	latitude: number,
	atmos_refract: number,
	elevation: number,
	function: FUNC_CODES,
	slope: number
	azm_rotation: number,
	//intermediate
	jd?: number,
	jc?: number,	
	jde?: number,
	jce?: number,
	jme?: number,
	l?: number,
	b?: number,
	r?: number,
	theta?: number,
	beta?: number,
	x0?: number,
	x1?: number,
	x2?: number,
	x3?: number,
	x4?: number,
	del_psi?: number,
	del_epsilon?: number,
	epsilon0?: number,
	epsilon?: number,
	del_tau?: number,
	lamda?: number,
	nu0?: number,
	nu?: number,
	alpha?: number,
	delta?: number,
	h?: number,
	xi?: number,
	del_alpha?: number,
	delta_prime?: number,
	alpha_prime?: number,
	h_prime?: number,
	e0?: number,
	del_e?: number,
	e?: number,
	eot?: number,
	srha?: number,
	ssha?: number,
	sta?: number,
	//output
	zenith?: number,
	azimuth_astro?: number,
	azimuth?: number,
	incidence?: number,
	suntransit?: number,
	sunrise?: number,
	sunset?: number
}