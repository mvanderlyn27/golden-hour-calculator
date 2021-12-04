

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
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include "spa.h"  //include the SPA header file
#include <time.h>

#define GOLDEN_HOUR_START 0 
#define GOLDEN_HOUR_END 6 

double get_angle( double year, double month, double day, double hour, double minute, double second, double longitude, double latitude){
    spa_data spa;  //declare the SPA structure
    spa.year          = year;
    spa.month         = month;
    spa.day           = day;
    spa.hour          = hour;
    spa.minute        = minute;
    spa.second        = second;
    spa.timezone      = 0;
    spa.delta_ut1     = 0;
    spa.delta_t       = 0;
    spa.longitude     = longitude;
    spa.latitude      = latitude;
    spa.elevation     = 0;
    spa.pressure      = 0;
    spa.temperature   = 0;
    spa.slope         = 0;
    spa.azm_rotation  = 0;
    spa.atmos_refract = 0.5667;
    spa.function      = SPA_ALL;
    int result = spa_calculate(&spa);
    if (result == 0)  //check for SPA errors
    {
        double output = spa.e0;
        return output;
    } else { 
        printf("SPA Error Code: %d\n", result);
        exit(0);
    }
}
//checks every 20 seconds of a day to figure out which angle is closest to our desired angle
//2 optimizations, checking for both angles in one sweep, and finding optimal step size for seconds
struct time_output *find_time(struct time_input input){ 
    struct time_output *out = malloc(sizeof (struct time_output) * 2);  
    struct time_output out_ar[2];
    double min_diff = 0.1;
    bool first_angle_found= false;
    int counter= 0;
    int i = 0;
    //decrease for longer querries, but more accurate results
    /*
        date: 2021-03-12
        lat: 31.42
        long: -83.42
        "real" sunrise: 2021-12-04T12:19:00
        step size(in seconds) - ms to complete
        5 - 625. 66 - 2021-12-04T12:22:10
        10 - 417.38 - 2021-12-04T12:22:15
        20 - 252.50 - 2021-12-04T12:22:30
        60 - 97.64  - 2021-12-04T12:23:10
    */
    for(int i = 0; i < 86400; i+=20){
        int hours = i/3600;
        int minutes = (i- (3600* hours))/60;  
        int seconds = (i - (3600*hours) - (60* minutes));
        double deg = get_angle(input.year, input.month, input.day, hours, minutes, seconds, input.longitude, input.latitude);
        //maybe work on this to stop before going negative, so you'll always be slightly before instead of after time
        if(fabs(deg - input.degree)  < min_diff && i < 86400){
            min_diff = fabs(deg-input.degree);
            if(!first_angle_found){
                first_angle_found = true;
            }
        }
        else if(first_angle_found == true && fabs(deg-input.degree) > min_diff && i< 86400){
            i+= 7*3600;
            first_angle_found = false;
            min_diff = 0.1;
            struct time_output time = {hours, minutes, seconds, deg};
            out_ar[counter] = time;
            counter+=1;
        }
        i +=5;
    }
    memcpy(out, out_ar, sizeof *out * 2);
    return out;
}

int to_seconds(struct time_output in){
    return (in.hour *3600) + (in.minute * 60) + in.second;
}

void sort_angles(struct time_output *in_1, struct time_output *in_2){
    for(int i = 0; i < 2; i ++) {
        if(to_seconds(in_1[i]) > to_seconds(in_2[i])){
            struct time_output temp = in_1[i];
            in_1[i] = in_2[i];
            in_2[i] = temp;
        }
    }
}

struct solar_calc_output find_golden_hour_time (struct solar_calc_input in)
{
    int result;
    float min, sec;
    time_t now;
    time(&now);
    //enter required input values into SPA structure
        struct time_input in_1= {GOLDEN_HOUR_START, in.year, in.month, in.day, in.latitude, in.longitude};
        struct time_input in_2= {GOLDEN_HOUR_END, in.year, in.month, in.day, in.latitude, in.longitude};
        struct time_output *out_1 = find_time(in_1);
        struct time_output *out_2 = find_time(in_2);
        sort_angles(out_1, out_2);
        struct solar_calc_output out = {out_1[0].hour, out_1[0].minute, out_1[0].second, out_2[0].hour, out_2[0].minute, out_2[0].second, out_1[1].hour, out_1[1].minute, out_1[1].second, out_2[1].hour, out_2[1].minute, out_2[1].second};
        free(out_1);
        free(out_2);
        return out;
    }
// int main (int argc, char *argv[])
// {
//     struct solar_calc_input in = {2021, 12, 3, 31.42, -83.42};
//     struct solar_calc_output out = find_golden_hour_time(in);
//     printf("morn1: %d:%d:%d\n", out.start_time_morning_h, out.start_time_morning_m, out.start_time_morning_s);
//     printf("morn2: %d:%d:%d\n", out.end_time_morning_h, out.end_time_morning_m, out.end_time_morning_s);
//     printf("night1: %d:%d:%d\n", out.start_time_night_h, out.start_time_night_m, out.start_time_night_s);
//     printf("night2: %d:%d:%d\n", out.end_time_night_h, out.end_time_night_m, out.end_time_night_s);
// }
