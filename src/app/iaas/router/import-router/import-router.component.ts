import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ResourceConfigService} from '../../../shared/services/resource-config.service';
@Component({
  selector: 'import-router',
  templateUrl: './import-router.component.html',
  providers: [  ResourceConfigService ]
})

export class ImportRouterComponent implements OnInit {
  @Input() importRouterList: any;
  @Output() onSave = new EventEmitter();
  importRouterIds: any[] = [];
  orgName:any;
  projectList: any[];
  constructor(private resourceConfigService: ResourceConfigService) {
  }

  ngOnInit() {
    this.orgName='所有组织';
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );
  }

  check(item:any){
    if(this.orgName==='所有组织'){
       return true;
    }else {
            if(this.orgName===item.projectName){
                   return true;
            }
                  return false;
             }
    }
  checkRouterImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importRouterIds.push(id);
    } else {
      for (let i = 0; i < this.importRouterIds.length; i++) {
        if (this.importRouterIds[i] === id) {
          this.importRouterIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importRouterIds);
    console.log(this.importRouterIds);
  }

}
