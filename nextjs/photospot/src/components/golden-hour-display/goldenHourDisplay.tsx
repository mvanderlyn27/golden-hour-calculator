import {SolarOutput} from '../../types/types'
import {Space, Typography } from 'antd';
const {Text} = Typography;

const Output = (props: any) => {
    const parseDate = (timestamp: number) =>{
        console.log(timestamp);
        let date = new Date(timestamp);
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
                      <Text>Morning: {parseDate(props.solarOutput.goldenHourDawnStart)}-{parseDate(props.solarOutput.goldenHourDawnEnd)}</Text>
                      <Text>Night: {parseDate(props.solarOutput.goldenHourDuskStart)}-{parseDate(props.solarOutput.goldenHourDuskEnd)}</Text>
                </Typography> 
            }
            </Space>

    );
}

export default Output; 