import styles from '@/styles/Explore.module.css'
import Head from 'next/head'
import { SolarInput, SolarOutput } from '../types/types';
import { Typography, Layout } from 'antd';
const { Sider, Content } = Layout;
const {Title} = Typography;
import Input from '../components/golden-hour-form/goldenHourForm';
import Output from '../components/golden-hour-display/goldenHourDisplay';
import MapHolder from '../components/map-holder/map-holder';
import { Divider, Space } from 'antd';
import * as React from 'react'
export default function Explore() {
    const [solarOutput, setSolarOutput] = React.useState<SolarOutput | null>(null);
    const [submitClicked, setSubmitClicked] = React.useState<true | false>(false);
    const [lat, setLat] = React.useState<number|null>(38);
    const [long, setLong] = React.useState<number|null>(-78);
      return (
        <>
      <Head>
        <title>explore</title>
        <meta name="description" content="explore page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Layout>
              <Sider style={{ background: "#fff", height: "100vh" }} width={'40vw'} >
                    <Space direction="vertical" align="center" style={{width:"100%"}}>
                        <Title>PhotoSpot</Title>
                        <Divider/> 
                        <Input submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} setSolarOutput={setSolarOutput} lat={lat} long={long} setLat={setLat} setLong={setLong} />
                        <Divider/>
                        <Output submitClicked={submitClicked} solarOutput={solarOutput} />
                    </Space>
              </Sider>
              <Content>
                <MapHolder lat={lat} long={long} setLat={setLat} setLong={setLong}/>
              </Content>
            </Layout>
        </main>
        </>
      )
}