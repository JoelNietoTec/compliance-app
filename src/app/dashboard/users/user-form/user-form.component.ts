import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, Form, FormControl, FormGroup, FormBuilder, EmailValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User, UserProfile } from '../../../shared/models/users.model';
import { UserService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  _userForm: FormGroup;
  _user: User = {};
  _profiles: UserProfile[];

  constructor(private _fb: FormBuilder, private _userServ: UserService, private _router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this._profiles = [
      { ID: 1, Name: 'Administrador', EnglishName: 'Administrator' },
      { ID: 2, Name: 'Usuario', EnglishName: 'User' },
      { ID: 3, Name: 'Pruebas', EnglishName: 'Test' }
    ];
    this._userForm = new FormGroup(
      {
        UserName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        Email: new FormControl('', Validators.required),
        UserProfileID: new FormControl('', Validators.required),
        Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        PasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
      },
      this.passwordConfirm
    );
  }

  saveUser(model: User) {
    model.CreateDate = new Date();
    this._userServ.createUser(model).subscribe(data => {
      this.toastr.success('Usuario creado exitosamente', model.UserName);
      this._router.navigate(['app/usuarios']);
    });
  }

  passwordConfirm(g: FormGroup) {
    return g.get('Password').value === g.get('PasswordConfirm').value ? null : { mismatch: true };
  }
}
