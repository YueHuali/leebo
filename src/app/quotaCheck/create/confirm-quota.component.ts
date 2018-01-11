import {Component, OnInit, Input} from '@angular/core';
import {BASE_OC_URI} from '../../shared/oc-info';
import {QuotaCheckService} from '../../shared/services/quotaCheck.service';
import {HttpInterceptor} from '../../shared/interceptor/HttpInterceptor';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';

@Component({
  selector: 'app-confirm-quota',
  templateUrl: 'confirm-quota.component.html'
})
export class ConfirmQuotaComponent implements OnInit {
  @Input() quotaParam: any;
  quota: any;
  project: any;


  constructor(private http: HttpInterceptor,
              private quotaCheckService: QuotaCheckService) { }

  ngOnInit() {
  }

  updateQuota(flag: any, checkQuota: any) {
    /*审核逻辑*/
    checkQuota.status = flag;
    console.log('checkQuotaaaaaaaaaaaaaaaaaa=', checkQuota);
    this.project = checkQuota.project;
    const limitsCPU = checkQuota.limitsCPU;
    const limitsMem =  checkQuota.limitsMemory;
    const limitsMemory =  checkQuota.limitsMemory.split('Gi');
    const pods = checkQuota.pods;
    const requestsCPU = checkQuota.requestsCPU;
    const requestsMem = checkQuota.requestsMemory;
    const requestsMemory = checkQuota.requestsMemory.split('Gi');


    const body = {
      'apiVersion': 'v1',
      'kind': 'LimitRange',
      'metadata': {
        'name': 'core-resource-limits',
        'namespace': checkQuota.project
      },
      'spec': {
        'limits': [
          {
            'max': {
              'cpu': limitsCPU / pods,
              'memory': limitsMemory[0] / pods + 'Gi'
            },
            'min': {
              'cpu': requestsCPU / pods,
              'memory': requestsMemory[0] / pods + 'Gi'
            },
            'type': 'Pod'
          },
          {
            'default': {
              'cpu': requestsCPU / pods,
              'memory': requestsMemory[0] / pods + 'Gi'
            },
            'defaultRequest': {
              'cpu': '250m',
              'memory': '256Mi'
            },
            'max': {
              'cpu': limitsCPU / pods,
              'memory': limitsMemory[0] / pods + 'Gi'
            },
            'maxLimitRequestRatio': {
              'cpu': 2
            },
            'min': {
              'cpu': requestsCPU / pods,
              'memory': requestsMemory[0] / pods + 'Gi'
            },
            'type': 'Container'
          }
        ]
      }
    };


    /*https://localhost:8443/api/v1/namespaces/quota007/limitranges*/
    const objUrl = BASE_OC_URI + '/api/v1/namespaces/' + this.project + '/limitranges';
    console.log('bodyyyy=', body);
    console.log('objUrll=', objUrl);



    if (checkQuota.status === '3') {
      if (checkQuota.isExist === '1') {
        const patchUrl = BASE_OC_URI + '/api/v1/namespaces/' + checkQuota.project + '/resourcequotas/' + checkQuota.name;
        console.log('patchUrl = :', patchUrl);

        this.getQuota(patchUrl).subscribe(data => {
          this.quota = data;

          this.quota.spec.hard = {
            'limits.cpu': checkQuota.limitsCPU,
            'limits.memory': checkQuota.limitsMemory,
            'pods': checkQuota.pods,
            'requests.cpu': checkQuota.requestsCPU,
            'requests.memory': checkQuota.requestsMemory
          };
          console.log('this.uptQuota = :', this.quota);

          this.http.patch(patchUrl, this.quota, this.addContentType('application/strategic-merge-patch+json') ).subscribe(dataQuota => {
            this.http.post(objUrl, body).subscribe(creData => {
                // location.reload();
              },
              error => {
                const errorData = error.json();
                alert(errorData['message']);
              }
            ) ;
          } );
        } );
      } else {/*不存在就创建*/
        const createUrl = BASE_OC_URI + '/api/v1/namespaces/' + this.project + '/resourcequotas';
        const createBody = {
          'apiVersion': 'v1',
          'kind': 'ResourceQuota',
          'metadata': {
            'name': 'compute-resources',
            'namespace': this.project
          },
          'spec': {
            'hard': {
              'limits.cpu': limitsCPU,
              'limits.memory': limitsMem,
              'pods': pods,
              'requests.cpu': requestsCPU,
              'requests.memory': requestsMem
            }
          }
        };
        console.log('createUrl = :', createUrl);
        console.log('createBody = :', createBody);

        this.http.post(createUrl, createBody).subscribe(data => {
          this.http.post(objUrl, body).subscribe(creData => {
              // location.reload();
            },
            error => {
              const errorData = error.json();
              alert(errorData['message']);
            }
          ) ;
        });
      }
    }

    /*  审批后，发送到数据库，改变数据状态 */
    this.quotaCheckService.updateQuotaRecord(checkQuota).subscribe(
      res => {
        location.reload();
        // console.log('审批成功了！');
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  getQuota(url: any): Observable<any> {
    console.log('url=', url);
    return this.http.get(url).map(
      (response: Response) => response.json()
    );
  }

  addContentType(contentType: string): RequestOptionsArgs {
    let option: RequestOptionsArgs = new RequestOptions();
    let headers = new Headers();
    headers.append('Content-Type', contentType);
    option.headers = headers;
    console.log('option=', option);
    return option;
  }
}
