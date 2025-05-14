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
				if (
					this.AuthenticationService.userValue?.roles === "CORS" ||
					this.AuthenticationService.userValue?.roles === "CORB"
				) {
					this.router.navigate(["/correspondent-bank/management/table-a"]);
				} else if (this.AuthenticationService.userValue?.roles === "BOTL") {
					this.router.navigate(["/accumulate-amount/insert"]);
				} else {
					this.router.navigate(["/accumulate-amount"]);
				}
			},
			error: (error: HttpErrorResponse) => {
				this.isLoading = false;
        this.isError = true;
			},
		});
	}
}
