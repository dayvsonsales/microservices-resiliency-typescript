import 'dotenv/config';

import axios from 'axios';
import * as ip from 'ip';

const eurekaService =
  process.env.EUREKA_SERVICE || 'http://localhost:8761/eureka';

async function registerWithEureka(appName: string, port: number) {
  console.log(`Registering ${appName} with Eureka`);

  const data = {
    instance: {
      hostName: process.env.HOSTNAME || 'localhost',
      instanceId: `${appName}-${port}`,
      vipAddress: `${appName}`,
      app: `${appName.toUpperCase()}`,
      ipAddr: ip.address(),
      status: 'UP',
      port: {
        $: port,
        '@enabled': true,
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn', //need to change to cloud if hosted on AWS or other cloud provider
      },
    },
  };

  try {
    await axios.post(`${eurekaService}/apps/${appName}`, JSON.stringify(data), {
      headers: { 'content-type': 'application/json' },
    });

    console.log('Registered with Eureka');

    setInterval(async () => {
      try {
        await axios.put(
          `${eurekaService}/apps/${appName}/${appName}-${port}`,
          null,
          {
            headers: { 'content-type': 'application/json' },
          },
        );

        console.log('Successfully sent heartbeat to Eureka.');
      } catch (e) {
        console.log('Sending heartbeat to Eureka failed.');
      }
    }, 50 * 1000);
  } catch (e) {
    console.log(`Eureka error: ${e}`);
    setTimeout(() => registerWithEureka(appName, port), 10000);
  }
}

export default registerWithEureka;
