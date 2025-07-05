import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoTableModule, PoPageModule, PoButtonModule } from '@po-ui/ng-components';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoPageModule, PoButtonModule],
  template: `
    <po-page-default p-title="Consulta de Usuários">
      <po-table
        [p-items]="users"
        [p-columns]="columns"
        (p-edit)="edit($event)"
        (p-remove)="remove($event)">
      </po-table>
      <po-button p-label="Novo Usuário" (click)="newUser()"></po-button>
    </po-page-default>
  `,
  styles: ''
})
export class UserListComponent {
  users: User[] = [];
  readonly columns = [
    { property: 'login', label: 'Login' },
    { property: 'fullName', label: 'Nome Completo' }
  ];

  constructor(private userService: UserService, private router: Router) {
    this.load();
  }

  load() {
    this.users = this.userService.getAll();
  }

  edit(user: User) {
    this.router.navigate(['/users', user.login]);
  }

  remove(user: User) {
    this.userService.remove(user.login);
    this.load();
  }

  newUser() {
    this.router.navigate(['/users/new']);
  }
}
