window['$'].ajax({
  url: './assets/js/config.json',
  async: false,
  success: function (res) {
    window['QY_CONFIG'] = res;
  }
});
export const BASE_URI = window['QY_CONFIG'].api_gateway;
export const BASE_OC_URI = BASE_URI + '/paas';
export const BASE_IAAS_URI = BASE_URI + '/qy-iaas/iaas/v1';
export const BASE_TASK_URI = BASE_URI + '/qy-task/v1/tasks/taskId/status';
export const NODE_SERVER = window['QY_CONFIG'].node_server;
export const IaaS_USER_ID = window['QY_CONFIG'].iaas_user_id;
export const IaaS_PROJECT_ID = window['QY_CONFIG'].iaas_project_id;
export class OcInfo {
}
