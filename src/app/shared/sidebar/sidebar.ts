import { AfterViewInit, Component } from '@angular/core';
import { QY_CONFIG } from '../oc-info';

@Component({
  // moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements AfterViewInit {
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
  ngAfterViewInit(): void {
    let $ = window['jQuery'];
    $('#sidebar-collapse-btn').on('click', function(event){
      event.preventDefault();

      $('#app').toggleClass('sidebar-open');
    });

    $('#sidebar-overlay').on('click', function() {
      $('#app').removeClass('sidebar-open');
    });
    $('.metismenu').metisMenu();

    let $menuTabs = $('.menu-tabs');
    $menuTabs.find('li').on('click', function(event) {
      let $this = $(this);
      if ($this.hasClass('active')) {
        return;
      }
      $menuTabs.find('li.active').removeClass('active').each(function (i, element) {
        let target = $(element).data('target');
        $(target).slideUp()
      });
      let currentTarget = $this.addClass('active').data('target');
      $(currentTarget).slideDown();
    })
  }

}
