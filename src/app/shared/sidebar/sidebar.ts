import { Component } from '@angular/core';
import { QY_CONFIG } from '../oc-info';

@Component({
  // moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent {
  isActive = false;
  showMenu: string = '';
  iaasEnabled: boolean = false;

  eventCalled() {
    this.isActive = !this.isActive;
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  ngOnInit() {
    this.iaasEnabled = QY_CONFIG.iaas_enabled;
  }
}
