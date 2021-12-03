

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

double get_angle( double year, double month, double day, double hour, double minute, double second, double timezone, double longitude, double latitude){
    
    spa_data spa;  //declare the SPA structure
    spa.year          = year;
    spa.month         = month;
    spa.day           = day;
    spa.hour          = hour;
    spa.minute        = minute;
    spa.second        = second;
    spa.timezone      = timezone;
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
//        printf("angle: %f",output);
        return output;
    } else { 
        printf("SPA Error Code: %d\n", result);
        exit(0);
    }
}
struct time_output *find_time(double degree, int year, int month, int day, int timezone, int longitude, int latitude){ 
    struct time_output *out = malloc(sizeof (struct time_output) * 2);  
    struct time_output out_ar[2];
    double min_diff = 0.1;
    bool first_angle_found= false;
    int counter= 0;
    int i = 0;
    for(int i = 0; i < 86400; i+=5){
        int hours = i/3600;
        int minutes = (i- (3600* hours))/60;  
        int seconds = (i - (3600*hours) - (60* minutes));
        double deg = get_angle(year, month, day, hours, minutes, seconds, timezone, longitude, latitude);
        if(deg <0){

        } 
        //maybe work on this to stop before going negative, so you'll always be slightly before instead of after time
        if(fabs(deg - degree)  < min_diff && i < 86400){
            min_diff = fabs(deg-degree);
            if(!first_angle_found){
                first_angle_found = true;
            }
        }
        else if(first_angle_found == true && fabs(deg-degree) > min_diff && i< 86400){
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
int main (int argc, char *argv[])
{
    int result;
    float min, sec;
    time_t now;
    time(&now);
    //enter required input values into SPA structure
    double year, month, day, timezone, longitude, latitude, degree1, degree2;
    if(argc == 9 ){
        sscanf(argv[1], "%lf",&year );
        sscanf(argv[2], "%lf",&month );
        sscanf(argv[3], "%lf",&day );
        sscanf(argv[4], "%lf",&timezone );
        sscanf(argv[5], "%lf",&latitude);
        sscanf(argv[6], "%lf",&longitude);
        sscanf(argv[7], "%lf",&degree1);
        sscanf(argv[8], "%lf",&degree2);
        struct time_output *out_1 = find_time(degree1, year, month, day, timezone, longitude, latitude);
        struct time_output *out_2 = find_time(degree2, year, month, day, timezone, longitude, latitude);
     
        printf("angle 1 \nfirst time: %02d:%02d:%02d degree: %f  second time: %02d:%02d:%02d degree:%f\n",out_1[0].hour, out_1[0].minute, out_1[0].second, out_1[0].deg, out_1[1].hour, out_1[1].minute, out_1[1].second, out_1[1].deg);
        printf("angle 2 \nfirst time: %02d:%02d:%02d degree: %f  second time: %02d:%02d:%02d degree:%f\n",out_2[0].hour, out_2[0].minute, out_2[0].second, out_2[0].deg, out_2[1].hour, out_2[1].minute, out_2[1].second, out_2[1].deg);
        free(out_1);
        free(out_2);
        return 1;
    }
    else{
        printf("error, badly formatted inputs");
        return 0;
    }
}