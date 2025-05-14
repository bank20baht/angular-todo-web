import { LoginRequestType, LoginResponseType, ReFreshTokenRequestType, ReFreshTokenResponseType } from '@/types';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private readonly baseUrl: string = import.meta.env.NG_APP_IDENTITY_URL;
	private userInfo: LoginResponseType | null = null;

  router = inject(Router);
  http = inject(HttpClient);


	public refreshAccessToken() {
		if (this.userInfo) {
			let user: ReFreshTokenRequestType = {
				username: this.userInfo.username,
				refresh_token: this.userInfo.refresh_token,
			};
			return this.http
				.post<ReFreshTokenResponseType>(
					`${this.baseUrl}/v1/authentication/refresh-token`,
					user,
				)
				.pipe(
					map((response: ReFreshTokenResponseType) => {
            this.userInfo!.access_token = response.access_token;
            this.userInfo!.refresh_token = response.refresh_token;
						return response;
					}),
				);
		}
		return undefined;
	}

	public get userValue() {
		return this.userInfo;
	}

	public login(request: LoginRequestType) {
		return this.http
			.post<LoginResponseType>(
				`${this.baseUrl}/v1/authentication/login`,
				request,
			)
			.pipe(
				map((response: LoginResponseType) => {
					this.userInfo = response;
					return response;
				}),
			);
	}

	public logout() {
		this.userInfo = null;
		this.router.navigate(["/login"]);
	}
}
