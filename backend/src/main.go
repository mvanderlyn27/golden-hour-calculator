package main

import (
	"C"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)
import "fmt"

type SolarCalcInput struct {
	Date     time.Time `json:"date"`
	Timezone int16     `json:'"timezone"`
	Lat      float32   `json:"lat"`
	Long     float32   `json:"long"`
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
	year := Input.Date.Year()
	month := Input.Date.Month()
	day := Input.Date.Day()
	in := C.struct_solar_calc_input{
		year:      year,
		month:     month,
		day:       day,
		timezone:  Input.Timezone,
		latitude:  Input.Lat,
		longitude: Input.Long,
	}
	//need to figure out why we can't call the c function
	var calc_out SolarCalcOut = C.find_golden_hour_time(in)
	start_morning_string := fmt.Sprintf("%04d-%02d-%02d %02d:%02d:%02d", calc_out.start_time_morning_h, calc_out.start_time_morning_m, calc_out.start_time_morning_s)
	start_morning, err := time.Parse("2000-01-01 12:12:12", start_morning_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	end_morning_string := fmt.Sprintf("%04d-%02d-%02d %02d:%02d:%02d", calc_out.end_time_morning_h, calc_out.end_time_morning_m, calc_out.end_time_morning_s)
	end_morning, err := time.Parse("2000-01-01 12:12:12", end_morning_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	start_night_string := fmt.Sprintf("%04d-%02d-%02d %02d:%02d:%02d", calc_out.start_time_night_h, calc_out.start_time_night_m, calc_out.start_time_night_s)
	start_night, err := time.Parse("2000-01-01 12:12:12", start_night_string)
	if err != nil {
		fmt.Printf("got err, %+v\n", err)
	}
	end_night_string := fmt.Sprintf("%04d-%02d-%02d %02d:%02d:%02d", calc_out.end_time_night_h, calc_out.end_time_night_m, calc_out.end_time_night_s)
	end_night, err := time.Parse("2000-01-01 12:12:12", end_night_string)
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
