import * as React from 'react'
import { Stack, TextField, PrimaryButton, IStackStyles, IStackTokens, DatePicker, DayOfWeek,defaultDatePickerStrings} from "@fluentui/react";
import {SolarInput, SolarOutput} from '../types/types'
import axios from 'axios'
const Input = (props:any) => {
const inputItem: IStackStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};

React.useEffect(() => {
    async function getHour(){ 
        await getGoldenHour();
    }
    getHour();
}, [props.lat,props.long, props.submitClicked]);
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
const buttonClicked = async () => {
    if(!props.submitClicked){
        await props.setSubmitClicked(true);
    }
}
const getGoldenHour = async () => {
    if(props.submitClicked){ 
        const currentInput:SolarInput = {lat: props.lat, long: props.long, date: date_val};
        if(validateInput(currentInput)){
            //send request to backend
            //update frontend
            try{
                let res:SolarOutput = (await axios.put('/api/v1/golden-hour-times',currentInput)).data;
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
}

const inputParent: IStackTokens = {childrenGap: 5};
    return(
        <div>
            <Stack tokens={inputParent}>
                <Stack.Item styles = {inputItem}>
                    <TextField label="Location" value={props.location} onChange={(e,val)=>props.setLocation(val!==undefined? val: null)}/>
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <TextField label="Latitude" value={props.lat.toFixed(2)} onChange={(e,val)=>props.setLat(val!==undefined? parseFloat(val): null)}/>
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <TextField label="Longitude" value={props.long.toFixed(2)} onChange={(e,val)=>props.setLong(val!==undefined? parseFloat(val): null)}/>
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <DatePicker
                        firstDayOfWeek={DayOfWeek.Monday}
                        placeholder="Select a date..."
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                        onSelectDate={ (val) => updateDate(val!==undefined && val!==null? val.getTime()/1000:null) }
                        label = "Date:"
                    />
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <PrimaryButton text="Submit" onClick={buttonClicked}/>
                </Stack.Item>
            </Stack>
        </div>
    );
}

export default Input; 