import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.scss']
})
export class RouteCreateComponent implements OnInit {

  spliteServices: boolean = false;
  options: boolean = false;
  constructor() {
  }

  ngOnInit() {
  }
  toggleService(): void {
    this.spliteServices = !this.spliteServices;
  }
  showOptions(): void {
    this.options = true;
  }

}
