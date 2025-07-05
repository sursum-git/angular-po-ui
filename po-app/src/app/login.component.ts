import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule, PoButtonModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PoFieldModule, PoButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="login()" style="max-width: 300px; margin: auto;">
      <po-input formControlName="login" p-label="Login"></po-input>
      <po-password formControlName="password" p-label="Senha"></po-password>
      <po-button type="submit" p-label="Entrar"></po-button>
    </form>
  `,
  styles: ``
})
export class LoginComponent {
  readonly form;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.router.navigate(['/home']);
    }
  }
}
