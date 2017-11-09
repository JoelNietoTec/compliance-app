import { Component, OnInit } from '@angular/core';
import { Validators, Form, FormControl, FormGroup, FormBuilder, EmailValidator } from '@angular/forms';

import { User } from '../../../shared/models/users.model';
import { UserService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  _userForm: FormGroup;
  _user: User = {};

  constructor(
    private _fb: FormBuilder,
    private _userServ: UserService
  ) { }

  ngOnInit() {
    this._userForm = new FormGroup({
      UserName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      PasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, this.passwordConfirm);
  }

  saveUser(model: User) {
    this._userServ.createUser(model)
      .subscribe(data => {
        console.log(data);
      });
  }

  passwordConfirm(g: FormGroup) {
    return g.get('Password').value === g.get('PasswordConfirm').value
      ? null : { 'mismatch': true };
  }

}
