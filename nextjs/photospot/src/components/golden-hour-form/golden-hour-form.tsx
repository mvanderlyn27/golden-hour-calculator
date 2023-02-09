import * as React from 'react'
import {SolarInput, SolarOutput} from '../../types/types'
import axios from 'axios'
import { AutoComplete, Space, DatePicker, Button } from 'antd';
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoibXZhbmRlcmx5bjI3IiwiYSI6ImNsYzJ4a3Z0czByeXUzeGw5Y2pwa20zYnQifQ.xg9KR9YUbF5fpmpXHwyLpA' });
const geoCodingService = mbxGeocoding(baseClient);
const Input = (props:any) => {

const validateInput = (input: SolarInput) => {
    if(input === null || input.date === null || input.lat === null || input.long === null){
        return false;
    }
    if(input.lat < -90 || input.lat > 90){
        return false;
    }
    if(input.long <-180 || input.long > 180){
        return false
    }
    //maybe some date calc?
    return true
}

const [date_val, updateDate] = React.useState<number|null>(null);
const [location_val, updateLocation] = React.useState<any|null>(null);
const [location_options, updateLocationOptions] = React.useState<any|null>(null);
const buttonClicked = async () => {
    if(!props.submitClicked){
        await props.setSubmitClicked(true);
    }
    await getGoldenHour();
}
const getGoldenHour = async () => {
        const currentInput:SolarInput = {lat: props.lat, long: props.long, date: date_val};
        if(validateInput(currentInput)){
            //send request to backend
            //update frontend
            try{
                let res:SolarOutput = (await axios.put('/api/get-golden-hour',currentInput)).data;
                props.setSolarOutput(res);
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            console.log("error validating input");
            //display error
        }
}
    const handleLocationSearch = (val: string | undefined) => {
        if(val !== location_val?.label){
            updateLocation({value: [], label: val});
            geoCodingService.forwardGeocode({
                query: val  
            })
                .send()
                .then((response: { body: any; }) => {
                // GeoJSON document with geocoding matches
                const match = response.body.features;
                console.log('match',match);
                const match_dropdown_options = match.map((val:any) => {
                        return {value:val.center ,label: val.place_name} 
                });
                console.log('match text',match_dropdown_options);

                updateLocationOptions(match_dropdown_options);
                });
        }
    }
    const handleLocationSelect = (val: any) => {
        console.log(val);
        location_options.forEach((option: any) => {
            if(option.value == val){
                updateLocation(option)
                props.setLong(option.value[0]);
                props.setLat(option.value[1]);
            }
        })
    }
    return(
        <Space direction="vertical" size="middle" style={{alignItems: "center", display: "flex"}}>
            <AutoComplete
                options={location_options}
                onSelect={(val, label)=>handleLocationSelect(val)}
                onSearch={(val)=>handleLocationSearch(val)}
                placeholder="Search Location"
                value={location_val?.label}
                style = {{width: 200, textAlign: 'left'}}
            />
                <DatePicker style={{ width: 200 }} onChange={ (val) => updateDate(val!==undefined && val!==null? val.unix()/1000 : null) } />
                <Button type="primary" onClick={async function(){await buttonClicked()}}>Submit</Button>
        </Space>
    );
}

export default Input; 