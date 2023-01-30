export type SolarInput = {
    lat: number|null;
    long: number| null;
    date: number| null;
}
export type SolarOutput = {
    start_time_morning: number,
    end_time_morning: number,
    start_time_night: number,
    end_time_night: number,
}