import { AuthenticationService } from '@/services';
import { ErrorHeaderResponse } from '@/types';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = "";
	password = "";
	AuthenticationService = inject(AuthenticationService);

	formErrorMessage?: string;
	loginErrorMessage: string = "";

	isLoading: boolean = false;
	isError: boolean = false;

	constructor(private readonly router: Router) {}

	login() {
		this.isLoading = true;
		this.formErrorMessage = undefined;
		this.AuthenticationService.login({
			username: this.username,
			password: this.password,
		}).subscribe({
			next: (response) => {
				this.isLoading = false;
				this.isError = false; 
				this.router.navigate(["/todo"]);
			},
			error: (error: HttpErrorResponse) => {
				this.isLoading = false;
        this.isError = true;
			},
		});
	}
}
