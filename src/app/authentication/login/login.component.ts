import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _login: any = {
    UserName: '',
    Password: ''
  };

  _invalid: Boolean = false;
  _loading: Boolean = false;

  constructor(private _authServ: AuthService, private _router: Router, private toastr: ToastsManager) {}

  ngOnInit() {
    if (this._authServ.isLogged()) {
      this.toastr.info('Sesión finalizada', 'Adiós');
      this._authServ.authLogout();
    }
  }

  signIn() {
    this._loading = true;
    this._authServ.authLogin(this._login).subscribe(
      data => {
        if (data) {
          this._loading = false;
          this._authServ.setCurrentUser(data);
          console.log(data);
          const _user = this._authServ.getUserInfo();
          this.toastr.success(_user.UserName, 'Bienvenido');
          this._router.navigate(['/']);
        } else {
          this._loading = false;
          this._invalid = true;
        }
      },
      err => {
        this._loading = false;
        this._invalid = true;
      }
    );
  }
}
