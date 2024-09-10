import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError: string = '';
  isloading: boolean = false;

  // crate group

  loginform: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {
    if (this.loginform.valid) {
      this.isloading = true;
      this._AuthService.setloginform(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            localStorage.setItem('userToken', res.token);
            this._AuthService.SaveUserData();
            this._Router.navigate(['/home']);
          }
          this.isloading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isloading = false;
        },
      });
    } else {
      this.loginform.setErrors({ mismatch: true });
      this.loginform.markAllAsTouched();
    }
  }
}
