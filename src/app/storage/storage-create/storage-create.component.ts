import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../shared/services/storage.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.scss'],
  providers: [ StorageService ]
})
export class StorageCreateComponent implements OnInit {

  name: string;
  size: number;
  type: string;

  constructor(private storageService: StorageService, private ngRouter: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.storageService.createStorage(this.name, this.size, this.type).subscribe(
      (res: Response) => {
        this.ngRouter.navigateByUrl('/storage');
      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }
}
