import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PoMenuItem, PoMenuModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoMenuModule, RouterOutlet],
  template: `
    <po-menu [p-items]="items"></po-menu>
    <router-outlet></router-outlet>
  `,
  styles: ''
})
export class HomeComponent {
  readonly items: PoMenuItem[] = [
    { label: 'Usuários', action: () => this.router.navigate(['/users']) }
  ];
  constructor(private router: Router) {}
}
