import {Router} from '@angular/router';
let loadConfig: any = {};
window['$'].ajax({
  url: './assets/js/config.json',
  async: false,
  success: function (res) {
    loadConfig = res;
  }
});
export const QY_CONFIG: any = loadConfig;

export const BASE_URI = QY_CONFIG.api_gateway;
export const BASE_OC_URI = BASE_URI + '/paas';
export const BASE_IAAS_URI = BASE_URI + '/qy-iaas/iaas/v1';
export const BASE_TASK_URI = BASE_URI + '/qy-task/v1/tasks/taskId/status';
export const BASE_IAAS_SERVICE = BASE_URI + '/iaas-service';
export const NODE_SERVER = QY_CONFIG.node_server;
export const IaaS_USER_ID = QY_CONFIG.iaas_user_id;
export const IaaS_PROJECT_ID = QY_CONFIG.iaas_project_id;
export const BASE_PAAS_URI = BASE_URI + '/pservice';
export const BASE_RESMAN_URI = 'http://localhost:8062';

export class OcInfo {
}

export const navigateSelf = (router: Router) => {
  let url = router.parseUrl(router.url);
  (url.queryParams['r'] = new Date().getTime() + '') && router.navigateByUrl(url);
};
