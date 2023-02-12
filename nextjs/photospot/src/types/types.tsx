export type SolarInput = {
    lat: number|null;
    long: number| null;
    date: number| null;
}
export type SolarOutput = {
    goldenHourDawnStart: number,
    goldenHourDawnEnd: number,
    goldenHourDuskStart: number,
    goldenHourDuskEnd: number,
}