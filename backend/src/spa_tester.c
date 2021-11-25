

/////////////////////////////////////////////
//          SPA TESTER for SPA.C           //
//                                         //
//      Solar Position Algorithm (SPA)     //
//                   for                   //
//        Solar Radiation Application      //
//                                         //
//             August 12, 2004             //
//                                         //
//   Filename: SPA_TESTER.C                //
//                                         //
//   Afshin Michael Andreas                //
//   afshin_andreas@nrel.gov (303)384-6383 //
//                                         //
//   Measurement & Instrumentation Team    //
//   Solar Radiation Research Laboratory   //
//   National Renewable Energy Laboratory  //
//   1617 Cole Blvd, Golden, CO 80401      //
/////////////////////////////////////////////

/////////////////////////////////////////////
// This sample program shows how to use    //
//    the SPA.C code.                      //
/////////////////////////////////////////////

#include <stdio.h>
#include "spa.h"  //include the SPA header file
void output_spa(spa_data spa)
{
        printf("year:    %d\n",spa.year);
        printf("month:    %d\n",spa.month);
        printf("day:    %d\n",spa.day);
        printf("hour:    %d\n",spa.hour);
        printf("minute:    %d\n",spa.minute);
        printf("second:    %.6f\n",spa.second);
        printf("delta_ut1:    %.6f\n",spa.delta_ut1);
        printf("delta_t:    %.6f\n",spa.delta_t);
        printf("timezone:    %.6f\n",spa.timezone);
        printf("longitude:    %.6f\n",spa.longitude);
        printf("latitude:    %.6f\n",spa.latitude);
        printf("elevation:    %.6f\n",spa.elevation);
        printf("pressure:    %.6f\n",spa.pressure);
        printf("temperature:    %.6f\n",spa.temperature);
        printf("slope:    %.6f\n",spa.slope);
        printf("azm_rotation:    %.6f\n",spa.azm_rotation);
        printf("atmos_refract:    %.6f\n",spa.atmos_refract);
        printf("function:    %d\n",spa.function);

        printf("jd ,Julian Day:    %.6f\n",spa.jd);
        printf("jc, Julian century:    %.6f\n",spa.jc);
        printf("jde, Julian ephemeris day:    %.6f\n",spa.jde);
        printf("jce, Julian ephemeris century:    %.6f\n",spa.jce);
        printf("jme, Julian ephemeris millennium:    %.6f\n",spa.jme);
        printf("l, earth heliocentric longitude [degrees]:    %.6f\n",spa.l);
        printf("b, earth heliocentric latitude [degrees]:    %.6f\n",spa.b);
        printf("r, earth radius vector [Astronomical Units, AU]:    %.6f\n",spa.r);
        printf("theta, geocentric longitude [degrees]:    %.6f\n",spa.theta);
        printf("beta, geocentric latitude [degrees]:    %.6f\n",spa.beta);
        printf("x0, mean elongation (moon-sun) [degrees]:    %.6f\n",spa.x0);
        printf("x1, mean anomaly (sun) [degrees]:    %.6f\n",spa.x1);
        printf("x2, mean anomaly (moon) [degrees]:    %.6f\n",spa.x2);
        printf("x3, argument latitude (moon) [degrees]:    %.6f\n",spa.x3);
        printf("x4, ascending longitude (moon) [degrees]:    %.6f\n",spa.x4);
        printf("del_psi, nutation longitude [degrees]:    %.6f\n",spa.del_psi);
        printf("del_epsilon, nutation obliquity [degrees]:    %.6f\n",spa.del_epsilon);
        printf("epsilon0, ecliptic mean obliquity [arc seconds]:    %.6f\n",spa.epsilon0);
        printf("epsilon, ecliptic true obliquity  [degrees]:    %.6f\n",spa.epsilon);
        printf("del_tau, aberration correction [degrees]:    %.6f\n",spa.del_tau);
        printf("lamda, apparent sun longitude [degrees]:    %.6f\n",spa.lamda);
        printf("nu0, Greenwich mean sidereal time [degrees]:    %.6f\n",spa.nu0);
        printf("nu, Greenwich sidereal time [degrees]:    %.6f\n",spa.nu);
        printf("alpha, geocentric sun right ascension [degrees]:    %.6f\n",spa.alpha);
        printf("delta, geocentric sun declination [degrees]:    %.6f\n",spa.delta);
        printf("h, observer hour angle [degrees]:    %.6f\n",spa.h);
        printf("xi, sun equatorial horizontal parallax [degrees]:    %.6f\n",spa.xi);
        printf("del_alpha, sun right ascension parallax [degrees]:    %.6f\n",spa.del_alpha);
        printf("delta_prime, topocentric sun declination [degrees]:    %.6f\n",spa.delta_prime);
        printf("alpha_prime, topocentric sun right ascension [degrees]:    %.6f\n",spa.alpha_prime);
        printf("h_prime, topocentric local hour angle [degrees]:    %.6f\n",spa.h_prime);
        printf("e0, topocentric elevation angle (uncorrected) [degrees]:    %.6f\n",spa.e0);
        printf("del_e, atmospheric refraction correction [degrees]:    %.6f\n",spa.del_e);
        printf("e, topocentric elevation angle (corrected) [degrees]:    %.6f\n",spa.e);
        printf("eot, equation of time [minutes]:    %.6f\n",spa.eot);
        printf("srha, sunrise hour angle [degrees]:    %.6f\n",spa.srha);
        printf("ssha, sunset hour angle [degrees]:    %.6f\n",spa.ssha);
        printf("sta, sun transit altitude [degrees]:    %.6f\n",spa.sta);
        printf("zenith, topocentric zenith angle [degrees]:    %.6f\n",spa.zenith);
        printf("zenith_astro, topocentric azimuth angle (westward from south) [for astronomers]:    %.6f\n",spa.azimuth_astro);
        printf("azimuth, topocentric azimuth angle (eastward from north) [for navigators and solar radiation]:    %.6f\n",spa.azimuth);
        printf("incidence, surface incidence angle [degrees]:    %.6f\n",spa.incidence);
        printf("suntransit, local sun transit time (or solar noon) [fractional hour]:    %.6f\n",spa.suntransit);
        printf("sunrise, local sunrise time (+/- 30 seconds) [fractional hour]:    %.6f\n",spa.sunrise);
        printf("sunset, local sunset time (+/- 30 seconds) [fractional hour]:    %.6f\n",spa.sunset);
}

int main (int argc, char *argv[])
{
    spa_data spa;  //declare the SPA structure
    int result;
    float min, sec;

    //enter required input values into SPA structure

    spa.year          = 2003;
    spa.month         = 10;
    spa.day           = 17;
    spa.hour          = 12;
    spa.minute        = 30;
    spa.second        = 30;
    spa.timezone      = -7.0;
    spa.delta_ut1     = 0;
    spa.delta_t       = 67;
    spa.longitude     = -105.1786;
    spa.latitude      = 39.742476;
    spa.elevation     = 1830.14;
    spa.pressure      = 820;
    spa.temperature   = 11;
    spa.slope         = 30;
    spa.azm_rotation  = -10;
    spa.atmos_refract = 0.5667;
    spa.function      = SPA_ALL;
    
    //call the SPA calculate function and pass the SPA structure

    result = spa_calculate(&spa);

    if (result == 0)  //check for SPA errors
    {
        //display the results inside the SPA structure

        // printf("Julian Day:    %.6f\n",spa.jd);
        // printf("L:             %.6e degrees\n",spa.l);
        // printf("B:             %.6e degrees\n",spa.b);
        // printf("R:             %.6f AU\n",spa.r);
        // printf("H:             %.6f degrees\n",spa.h);
        // printf("Delta Psi:     %.6e degrees\n",spa.del_psi);
        // printf("Delta Epsilon: %.6e degrees\n",spa.del_epsilon);
        // printf("Epsilon:       %.6f degrees\n",spa.epsilon);
        // printf("Zenith:        %.6f degrees\n",spa.zenith);
        // printf("Azimuth:       %.6f degrees\n",spa.azimuth);
        // printf("Incidence:     %.6f degrees\n",spa.incidence);

        // min = 60.0*(spa.sunrise - (int)(spa.sunrise));
        // sec = 60.0*(min - (int)min);
        // printf("Sunrise:       %02d:%02d:%02d Local Time\n", (int)(spa.sunrise), (int)min, (int)sec);

        // min = 60.0*(spa.sunset - (int)(spa.sunset));
        // sec = 60.0*(min - (int)min);
        // printf("Sunset:        %02d:%02d:%02d Local Time\n", (int)(spa.sunset), (int)min, (int)sec);
        output_spa(spa);
    } else printf("SPA Error Code: %d\n", result);

    return 0;
}

/////////////////////////////////////////////
// The output of this program should be:
//
//Julian Day:    2452930.312847
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
