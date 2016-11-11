import { Route } from '../../route/route';
/**
 * Created by hexiuyu on 2016/11/11.
 */
export const ROUTES: Route[] = [
  {name: 'route1', hostName: 'my-host1', path: '/hxy', service: 'service1', targetPort: '8080->8080(TCP)'},
  {name: 'route2', hostName: 'my-host2', path: '/fff', service: 'service2', targetPort: '8080->8080(TCP)'}
]
