import { Injectable } from '@angular/core';

export interface User {
  login: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { login: 'jdoe', fullName: 'John Doe' }
  ];

  getAll(): User[] {
    return [...this.users];
  }

  getByLogin(login: string): User | undefined {
    return this.users.find(u => u.login === login);
  }

  save(user: User): void {
    const existing = this.getByLogin(user.login);
    if (existing) {
      existing.fullName = user.fullName;
    } else {
      this.users.push({ ...user });
    }
  }

  remove(login: string): void {
    this.users = this.users.filter(u => u.login !== login);
  }
}
