// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
let SunCalc = require('suncalc3');

type Data = {
    goldenHourDawnStart?: string,
    goldenHourDawnEnd?: string,
    goldenHourDuskStart?: string,
    goldenHourDuskEnd?: string,
    error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method === "PUT"){
        //calc based on date/lat/lng and return in json
        let date = req.body.date;
        let lat = req.body.lat;
        let long = req.body.long;
        console.log(date,lat,long);
        let solarTimes = SunCalc.getSunTimes(date, lat,long,0, false, true);
        console.log(solarTimes);
        const out = {goldenHourDawnStart: solarTimes.goldenHourDawnStart.ts, goldenHourDawnEnd: solarTimes.goldenHourDawnEnd.ts, goldenHourDuskStart:solarTimes.goldenHourDuskStart.ts, goldenHourDuskEnd: solarTimes.goldenHourDuskEnd.ts};
        console.log('out',out);
        res.send(out);
    }
    else{
        res.status(400).send({ error: 'Need to use PUT' });
    }
}
