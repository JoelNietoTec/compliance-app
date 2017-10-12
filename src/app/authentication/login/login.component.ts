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

  constructor(
    private _authServ: AuthService,
    private _router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.toastr.info('Sesión finalizada', 'Adiós');
    this._authServ.authLogout();
  }

  signIn() {
    this._authServ.authLogin(this._login)
      .subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.toastr.success(this._login.UserName, 'Bienvenido');
          this._router.navigate(['/']);
        } else {
          this._invalid = true;
        }
      },
      (err) => this._invalid = true
      );
  }

}
