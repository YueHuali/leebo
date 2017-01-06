import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../shared/services/storage.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [ StorageService ]
})
export class StorageComponent implements OnInit {

  volumns: any[];
  constructor(private storageService: StorageService, private ngRouter: Router) { }

  ngOnInit() {
    this.storageService.getStorages().subscribe(
      (data) => this.volumns = data.json().items
    );
  }

  removeNode(shareId: string) {
    if(confirm('确定要删除该存储？')) {
      this.storageService.deleteStorage(shareId).subscribe(
        (res: Response) => {
          this.ngRouter.navigateByUrl('/storage');
        },
        (error: Response) => {
          alert('删除失败！ message =' + error.json().message);
        }
      );
    }
  }
}
