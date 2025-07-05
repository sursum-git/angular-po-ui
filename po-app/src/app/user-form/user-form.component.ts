import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoPageModule, PoFieldModule, PoButtonModule } from '@po-ui/ng-components';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PoPageModule, PoFieldModule, PoButtonModule],
  template: `
    <po-page-default p-title="Usuário">
      <form [formGroup]="form" (ngSubmit)="save()">
        <po-input formControlName="login" p-label="Login" [p-disabled]="editing"></po-input>
        <po-input formControlName="fullName" p-label="Nome Completo"></po-input>
        <po-button type="submit" p-label="Salvar"></po-button>
        <po-button p-label="Excluir" p-type="danger" (click)="remove()" *ngIf="editing"></po-button>
      </form>
    </po-page-default>
  `,
  styles: ''
})
export class UserFormComponent {
  editing = false;
  form;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      fullName: ['', Validators.required]
    });
    const login = this.route.snapshot.paramMap.get('login');
    if (login) {
      const user = this.userService.getByLogin(login);
      if (user) {
        this.editing = true;
        this.form.patchValue(user);
      }
    }
  }

  save() {
    if (this.form.valid) {
      this.userService.save(this.form.value as User);
      this.router.navigate(['/users']);
    }
  }

  remove() {
    const login = this.form.controls['login'].value;
    if (login) {
      this.userService.remove(login);
      this.router.navigate(['/users']);
    }
  }
}
