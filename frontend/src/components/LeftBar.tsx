import { Stack, Separator, Text} from "@fluentui/react";
import  Input  from './Input';
import  Output from './Output';


const LeftBar = () => {


    return(
        <div>
            <Text variant="xxLarge">PhotoSpot</Text>
            <Separator/>
            <Stack>
                <Stack.Item>
                    <Input/>
                </Stack.Item>
                <Stack.Item>
                    <Separator/>
                </Stack.Item>
                <Stack.Item>
                    <Output/>
                </Stack.Item>
            </Stack>
        </div>


    );
}

export default LeftBar; 