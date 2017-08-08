import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../shared/services/user.service';

/**
 * Created by John Zhang on 16/12/7.
 */
@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() user: any;

  @Output() onCancel = new EventEmitter();

  @Output() onDone = new EventEmitter();

  private isSubmitting: boolean = false;

  constructor(private _userService: UserService) {

  }

  ngOnInit(): void {
    this.resetUser();
  }

  private resetUser() {
    this.user = {username: '', password: '', password2: ''};
  }

  register() {
    this.isSubmitting = true;
    this._userService.register(this.user)
      .subscribe({
        next: res => {
          console.log('register next():', res);
          if (res.ok) {
            this.resetUser();
          }
          alert(res.message);
          this.onDone.emit();
        },
        complete: () => {
          this.isSubmitting = false;
        },
        error: error => {
          alert('添加用户失败');
          this.isSubmitting = false;
        }
    });
  }

  cancel($event) {
    this.onCancel.emit();
  }
}
