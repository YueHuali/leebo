import { Component, OnInit } from '@angular/core';
import {ResourceConfigService} from '../shared/services/resource-config.service';

@Component({
  selector: 'flavor',
  templateUrl: './flavor.component.html',
  styleUrls: ['./flavor.component.scss'],
  providers: [ ResourceConfigService ]
})
export class FlavorComponent implements OnInit {

  flavors: any[];

  constructor(private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getFlavors().subscribe(
      (data) => this.flavors = data.json()
    );
  }

}
