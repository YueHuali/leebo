import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrganizationService} from '../../shared/services/organization.service';

/**
 * Created by John Zhang on 16/12/7.
 */
@Component({
  selector: 'app-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.scss'],
  providers: [ OrganizationService ]
})
export class UpdatePwdComponent implements OnInit {

  @Input() user: any;

  id: any;

  name: any;

  @Output() onCancel = new EventEmitter();

  @Output() onDone = new EventEmitter();

  private isSubmitting: boolean = false;

  constructor(private _userService: UserService ,  private ar: ActivatedRoute , private organizationService: OrganizationService, private router: Router) {

  }

  ngOnInit(): void {
    this.resetUser();

    this.ar.params.forEach((param : Params) => {
      this.id = param['id'];
      this.name = param['name'];
      this.user.id = this.id;
      this.user.username = this.name;
    });

  }

  private resetUser() {
    this.user = {username: '', password: '', password2: ''};
  }



  cancel($event) {
    this.onCancel.emit();
  }

  updatePwd() {
    this.isSubmitting = true;
    this.organizationService.updatePwd(this.user)
      .subscribe({
        next: res => {
          if (res.ok) {
            this.user = {password: '', password2: ''};
          }
          alert('更新密码成功');
          this.onDone.emit();
          this.router.navigateByUrl('/user');
        },
        complete: () => {
          this.isSubmitting = false;
        },
        error: error => {
          alert('更新密码失败');
          this.isSubmitting = false;
        }
      });
  }


}
