import { Deployment } from '../../deployment/deployment';
/**
 * Created by hexiuyu on 2016/11/15.
 */
export const DEPLOYMENTS: Deployment[] = [
  {name: 'deployment1', lastDeployment: '#1', status: 'Pending', created: '7天前', trigger: '镜像改变' },
  {name: 'deployment2', lastDeployment: '无', status: 'succeed', created: '3天前', trigger: '镜像改变' }
]
