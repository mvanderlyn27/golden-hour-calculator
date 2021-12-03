package main

/*
#include "spa.h"
*/
import "C"
import (
	"net/http"
	"time"

	"fmt"

	"github.com/gin-gonic/gin"
)

//work on removing timezone, default to 0, and just pass in time converted to UTC to backend
type SolarCalcInput struct {
	Date     string  `json:"date"`
	Timezone int16   `json:'"timezone"`
	Lat      float64 `json:"lat"`
	Long     float64 `json:"long"`
}
type SolarCalcOutput struct {
	StartTimeMorning time.Time `json:"start_time_morning"`
	EndTimeMorning   time.Time `json:"end_time_morning"`
	StartTimeNight   time.Time `json:"start_time_night"`
	EndTimeNight     time.Time `json:"end_time_night"`
}
type SolarCalcOut = C.struct_solar_calc_output

func hello(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "hello world")
}
func getGoldenHourTime(c *gin.Context) {
	//calc angle
	//break out year, month, day, timezone, lat, lng
	var Input SolarCalcInput
	if err := c.BindJSON(&Input); err != nil {
		fmt.Print("Error parsing input")
		return
	}
	date, err := time.Parse("2006-06-01", Input.Date)
	if err != nil {
		fmt.Print("Error parsing date")
		return
	}
	year := date.Year()
	month := date.Month()
	day := date.Day()
	in := C.struct_solar_calc_input{
		year:      C.int(year),
		month:     C.int(month),
		day:       C.int(day),
		timezone:  C.int(Input.Timezone),
		latitude:  C.double(Input.Lat),
		longitude: C.double(Input.Long),
	}
	//need to figure out why we can't call the c function
	var calc_out SolarCalcOut = C.find_golden_hour_time(in)
	fmt.Printf("%d:%d:%d\n", calc_out.start_time_morning_h, calc_out.start_time_morning_m, calc_out.start_time_morning_m)
	fmt.Printf("%d:%d:%d\n", calc_out.end_time_morning_h, calc_out.end_time_morning_m, calc_out.end_time_morning_m)
	fmt.Printf("%d:%d:%d\n", calc_out.start_time_night_h, calc_out.start_time_night_m, calc_out.start_time_night_m)
	fmt.Printf("%d:%d:%d\n", calc_out.end_time_night_h, calc_out.end_time_night_m, calc_out.end_time_night_m)
	start_morning_string := fmt.Sprintf("%d-%02d-%02dT%02d:%02d:%02d", year, month, day, calc_out.start_time_morning_h, calc_out.start_time_morning_m, calc_out.start_time_morning_s)
	start_morning, err := time.Parse("2006-01-02T15:04:05", start_morning_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	end_morning_string := fmt.Sprintf("%04d-%02d-%02dT%02d:%02d:%02d", year, month, day, calc_out.end_time_morning_h, calc_out.end_time_morning_m, calc_out.end_time_morning_s)
	end_morning, err := time.Parse("2006-01-02T15:04:05", end_morning_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	start_night_string := fmt.Sprintf("%04d-%02d-%02dT%02d:%02d:%02d", year, month, day, calc_out.start_time_night_h, calc_out.start_time_night_m, calc_out.start_time_night_s)
	start_night, err := time.Parse("2006-01-02T15:04:05", start_night_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	end_night_string := fmt.Sprintf("%04d-%02d-%02dT%02d:%02d:%02d", year, month, day, calc_out.end_time_night_h, calc_out.end_time_night_m, calc_out.end_time_night_s)
	end_night, err := time.Parse("2006-01-02T15:04:05", end_night_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	out := SolarCalcOutput{
		StartTimeMorning: start_morning,
		EndTimeMorning:   end_morning,
		StartTimeNight:   start_night,
		EndTimeNight:     end_night,
	}
	c.IndentedJSON(http.StatusOK, out)
}
func main() {
	router := gin.Default()
	router.GET("/", hello)
	router.GET("/golden-hour-times", getGoldenHourTime)
	router.Run("localhost:8080")
}
