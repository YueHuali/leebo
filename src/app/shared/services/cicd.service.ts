import {Injectable} from "@angular/core";
import {TEMPLATES} from "./mock-cicd";
import {Template} from "../../ci-cd/template";

@Injectable()
export class CiCdService {

  constructor() { }

  getTemplates():Template[]{
    return TEMPLATES;
  }

}
