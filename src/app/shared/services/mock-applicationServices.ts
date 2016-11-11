import {ApplicationService} from './applicationService';

export const APP_SERVICES: ApplicationService[] = [
  {
    name: 'mongodb',
    clusterIp: '172.30.199.241',
    externalIp: 'none',
    ports: '27017/TCP',
    selector: 'name=mongodb',
    age: '11minutes'
  },
  {
    name: 'nodejs-mongodb-example',
    clusterIp: '172.30.82.140',
    externalIp: 'none',
    ports: '8080/TCP',
    selector: 'name=nodejs-mongodb-example',
    age: '11minutes'
  },
];
