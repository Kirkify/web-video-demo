import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from './models/login.interface';

@Component({
  selector: 'command-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  serverMsg: string;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      ip: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: false
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.serverMsg = '';

    this.loading = true;

    const user: ILogin = {
      ip: this.formGroup.get('ip').value,
      username: this.formGroup.get('username').value,
      password: this.formGroup.get('password').value,
      rememberMe: this.formGroup.get('rememberMe').value
    };
  }
}
