import {Component, OnInit, Input} from '@angular/core';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'display-flavor',
  templateUrl: './display-flavor.component.html',
  providers: [ ResourceConfigService ]
})

export class DisplayFlavorComponent implements OnInit {
  @Input() displayFlavorId: any;
  flavorObj: any;

  constructor(private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getIaasFlavorById(this.displayFlavorId).subscribe(
      (data) => this.flavorObj = data.json().flavor
    );
  }

}
