import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError: string = '';
  isloading: boolean = false;
  registerSub!: Subscription;

  // crate group

  registerform: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    if (this.registerform.valid) {
      this.isloading = true;
      this.registerSub = this._AuthService
        .setregisterform(this.registerform.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.message == 'success') {
              this._Router.navigate(['/login']);
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
      this.registerform.setErrors({ mismatch: true });
      this.registerform.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
