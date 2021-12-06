import { Stack, Text} from "@fluentui/react";
import {SolarOutput} from '../types/types'

const Output = (props: any) => {

    const parseDate = (timestamp: number) =>{
       let date = new Date(timestamp*1000);
        return date.getHours()+':'+("0"+date.getMinutes()).substr(-2)+':'+("0"+date.getSeconds()).substr(-2);
    }
    return(
        <div>
            <Stack>
            {props.solarOutput === null || !props.submitClicked ?  
                <Stack.Item>
                    <Text variant={"xLarge"}>Enter Information above to see golden hour</Text>
                </Stack.Item>
                : 
                <div>
                <Stack.Item>
                    <Text variant={"xLarge"}>Morning: {parseDate(props.solarOutput.start_time_morning)}-{parseDate(props.solarOutput.end_time_morning)}</Text>
                </Stack.Item>
                <Stack.Item>
                    <Text variant={"xLarge"}>Night: {parseDate(props.solarOutput.start_time_night)}-{parseDate(props.solarOutput.end_time_night)}</Text>
                </Stack.Item>
                </div>
            }
            </Stack>
        </div>


    );
}

export default Output; 