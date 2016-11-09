import {Component, Injectable, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Project} from "../../shared/services/project";
import {isUndefined} from "util";
import {ProjectService} from "../../shared/services/project.service";

@Component({
  selector: 'project-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [ProjectService]
})

export class DeleteComponent {

  name: string;

  @Input()
  project: Project;

  closeResult: string;

  constructor(private modalService: NgbModal,private projectService:ProjectService) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if(!isUndefined(result)){
          this.projectService.getProjects().then(projects => {
            projects.pop();
          });
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
