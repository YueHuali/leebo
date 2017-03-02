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
export class OcInfo {
}
