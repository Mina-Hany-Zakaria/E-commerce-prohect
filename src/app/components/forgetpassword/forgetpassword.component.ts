import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  isloading: boolean = false;
  msgError: string = '';

  Step: number = 1;

  verifiyemail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifiyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  ResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  verfiyEmailSubmit(): void {
    if (this.verifiyemail.valid) {
      this.isloading = true;

      this._AuthService.setEmailVerify(this.verifiyemail.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.statusMsg == 'success') {
            this.Step = 2;
          }
          this.isloading = false;
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.statusMsg == 'fail') {
            this.msgError = err.error.message;
          }
          console.log(err);
          this.isloading = false;
        },
      });
    }
  }

  verfiyCodeSubmit(): void {
    if (this.verifiyCode.valid) {
      this.isloading = true;

      this._AuthService.setCodeVerify(this.verifiyCode.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.status == 'Success') {
            this.Step = 3;
            this.isloading = false;
          }
          this.isloading = false;
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
        },
      });
    }
  }

  ResetpasswordSubmit(): void {
    if (this.ResetPassword) {
      this._AuthService.setresetpassword(this.ResetPassword.value).subscribe({
        next: (res) => {
          console.log(res);

          localStorage.setItem('userToken', res.token);
          this._AuthService.SaveUserData();
          this._Router.navigate(['/home']);

          this.isloading = false;
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
        },
      });
    }
  }
}
