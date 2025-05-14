import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, switchMap, throwError, of } from "rxjs";
import { AuthenticationService } from "@/services";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router,
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const user = this.authenticationService.userValue;
		if (user) {
			request = this.addToken(request, user.access_token);
		}

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401 && user) {
					return this.handleTokenExpired(request, next);
				}

				return throwError(() => error);
			}),
		);
	}

	private addToken(
		request: HttpRequest<any>,
		accessToken: string,
	): HttpRequest<any> {
		return request.clone({
			setHeaders: { Authorization: `Bearer ${accessToken}` },
		});
	}

	private handleTokenExpired(
		request: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		const refreshToken$ = this.authenticationService.refreshAccessToken();
		if (!refreshToken$) {
			this.redirectToLogin();
			return throwError(() => new Error("No refresh token available"));
		}

		return refreshToken$.pipe(
			switchMap(() => {
				const newUser = this.authenticationService.userValue;
				if (newUser) {
					return next.handle(this.addToken(request, newUser.access_token)).pipe(
						catchError((error: HttpErrorResponse) => {
							if (error.status === 400) {
								this.redirectToLogin();
							}
							return throwError(() => error);
						}),
					);
				} else {
					this.redirectToLogin();
					return throwError(() => new Error("User not found after refresh"));
				}
			}),
			catchError((error) => {
				this.redirectToLogin();
				return throwError(() => error);
			}),
		);
	}

	private redirectToLogin() {
		this.authenticationService.logout(); 
		this.router.navigate(["/login"]);
	}
}
