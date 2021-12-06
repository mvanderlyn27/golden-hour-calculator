import * as React from 'react'
import { Stack, Separator, Text} from "@fluentui/react";
import  Input  from './Input';
import  Output from './Output';
import { SolarInput, SolarOutput } from '../types/types';


const LeftBar = (props:any) => {
  const [solarOutput, setSolarOutput] = React.useState<SolarOutput | null>(null);
  const [submitClicked, setSubmitClicked] = React.useState<true | false>(false);
    return(
        <div>
            <Text variant="xxLarge">PhotoSpot</Text>
            <Separator/>
            <Stack>
                <Stack.Item>
                    <Input submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} setSolarOutput={setSolarOutput} lat={props.lat} long={props.long} setLat={props.setLat} setLong={props.setLong} />
                </Stack.Item>
                <Stack.Item>
                    <Separator/>
                </Stack.Item>
                <Stack.Item>
                    <Output submitClicked={submitClicked} solarOutput={solarOutput} />
                </Stack.Item>
            </Stack>
        </div>


    );
}

export default LeftBar; 