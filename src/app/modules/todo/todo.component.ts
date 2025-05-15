import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NavbarComponent } from '@/shared';
import { TodoBoardComponent } from './components';

@Component({
  selector: 'app-todo',
  imports: [NavbarComponent, TodoBoardComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  AuthenticationService = inject(AuthenticationService);

  logout() {
    this.AuthenticationService.logout();
  }

}
