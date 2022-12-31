import * as React from 'react'
import  Input  from './Input';
import  Output from './Output';
import { SolarInput, SolarOutput } from '../types/types';
import { Typography, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Divider } from 'antd';
const {Title} = Typography;
const LeftBar = (props:any) => {
  const [solarOutput, setSolarOutput] = React.useState<SolarOutput | null>(null);
  const [submitClicked, setSubmitClicked] = React.useState<true | false>(false);
    return(
        <div>
            <Layout style={{ height: "100vh"}}>
                <Content>
                    <Title>PhotoSpot</Title>
                    <Divider/>
                </Content>
                <Content>
                    <Input submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} setSolarOutput={setSolarOutput} lat={props.lat} long={props.long} setLat={props.setLat} setLong={props.setLong} />
                </Content>
                    <Divider/>
                <Content>
                    <Output submitClicked={submitClicked} solarOutput={solarOutput} />
                </Content>
            </Layout>
        </div>


    );
}

export default LeftBar; 