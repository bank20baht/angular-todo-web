import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  AuthenticationService = inject(AuthenticationService);

  logout() {
    this.AuthenticationService.logout();
  }

}
