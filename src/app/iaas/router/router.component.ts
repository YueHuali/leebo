import {Component, OnInit} from '@angular/core';
import {Router} from './router';
import {isUndefined} from 'util';
import {RouterImportService} from '../../shared/services/iaas/router-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss'],
  providers: [ RouterImportService, ResourceConfigService ]
})

export class RouterComponent implements OnInit {

  projectList: any[];
  routers: any[];
  chkRouterIds: any[];
  routerList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeRouterIds: any[] = [];

  constructor(private routerImportService: RouterImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.routerImportService.getRouters().subscribe(
      (data) => this.routers = data.json()
    );

    this.routerImportService.getIaasRouters().subscribe(
      (data) => {
        this.routerList = data.json().routers;
        for (let importRouter of this.routerList) {
          for (let router of this.routers) {
            if(importRouter.id === router.id){
              importRouter.isUsed = 'true';
            }
          }
          for (let project of this.projectList) {
            if(importRouter.tenant_id === project.id) {
              importRouter.projectName = project.name;
            }
          }
        }
      }
    );
  }

  saveChkRouterIds(chkIds) {
    console.log('saveChkRouterIds chkIds:', chkIds);
    this.chkRouterIds = chkIds;
  }

  resetRouterIds() {
    this.chkRouterIds = [];
    console.log('resetRouterIds chkIds:', this.chkRouterIds);
  }

  importRouterSubmit() {
    console.log('importRouterSubmit chkIds:', this.chkRouterIds);
    if(this.chkRouterIds.length > 0 && !isUndefined(this.chkRouterIds)) {
      this.importFlag = false;
      let routers = this.transformRouter();
      this.routerImportService.importRoutersToDb(routers).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的路由器");
    }
  }

  transformRouter(): any[] {
    let routers = new Array();
    for (let i = 0; i < this.chkRouterIds.length; i++) {
      for (let j = 0; j < this.routerList.length; j++) {
        if(this.chkRouterIds[i] === this.routerList[j].id) {
          let router = new Router();
          router.id = this.chkRouterIds[i];
          router.name = this.routerList[j].name;
          router.tenant_id = this.routerList[j].tenant_id;
          if(this.routerList[j].external_gateway_info ) {
            if (this.routerList[j].external_gateway_info.external_fixed_ips) {
              router.subnet_id = this.routerList[j].external_gateway_info.external_fixed_ips[0].subnet_id;
            }
          }
          routers.push(router);
          console.log('router=', JSON.stringify(router));
          break;
        }
      }
    }
    return routers;
  }

  checkRouterRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeRouterIds.push(id);
    } else {
      for (let i = 0; i < this.removeRouterIds.length; i++) {
        if (this.removeRouterIds[i] === id) {
          this.removeRouterIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeRouterIds);
  }

  removeRouter() {
    console.log('Remove router chkIds:', this.removeRouterIds);
    if(this.removeRouterIds.length > 0 && !isUndefined(this.removeRouterIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.routerImportService.removeRoutersFromDb(this.removeRouterIds).subscribe(
          res => {
            location.reload();
          },
          error => {
            let errorData = error.json();
            alert(errorData['message']);
          }
        );
      }
    }else{
      alert("请选择需要移除的路由器");
    }
  }

}
