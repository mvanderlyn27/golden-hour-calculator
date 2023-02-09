import {SolarOutput} from '../../types/types'
import {Space, Typography } from 'antd';
const {Text} = Typography;

const Output = (props: any) => {

    const parseDate = (timestamp: number) =>{
       let date = new Date(timestamp*1000);
        return date.getHours()+':'+("0"+date.getMinutes()).substr(-2)+':'+("0"+date.getSeconds()).substr(-2);
    }
    return(
            <Space direction="vertical" align="center" style={{width:"100%"}}>
            {props.solarOutput === null || !props.submitClicked ?  
                <Typography>
                    <Text>Enter Information above to see golden hour</Text>
                </Typography>
                :
                <Typography>
                      <Text>Morning: {parseDate(props.solarOutput.start_time_morning)}-{parseDate(props.solarOutput.end_time_morning)}</Text>
                      <Text>Night: {parseDate(props.solarOutput.start_time_night)}-{parseDate(props.solarOutput.end_time_night)}</Text>
                </Typography> 
            }
            </Space>

    );
}

export default Output; 