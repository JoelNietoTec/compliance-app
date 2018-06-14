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
      { id: 1, name: 'Administrador', englishName: 'Administrator' },
      { id: 2, name: 'Usuario', englishName: 'User' },
      { id: 3, name: 'Pruebas', englishName: 'Test' }
    ];
    this._userForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', Validators.required),
        userProfileID: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
      },
      this.passwordConfirm
    );
  }

  saveUser(model: User) {
    model.createDate = new Date();
    this._userServ.createUser(model).subscribe(data => {
      this.toastr.success('Usuario creado exitosamente', model.userName);
      this._router.navigate(['app/usuarios']);
    });
  }

  passwordConfirm(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { mismatch: true };
  }
}
