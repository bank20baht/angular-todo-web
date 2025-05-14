import { AuthenticationService } from "@/services";
import { Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-page-not-found",
	standalone: true,
	imports: [],
	templateUrl: "./page-not-found.component.html",
})
export class PageNotFoundComponent {
	LocationService = inject(Location);
	Router = inject(Router);
	AuthenticationService = inject(AuthenticationService);

	handleClickBackButton() {
		this.LocationService.back();
	}

	public checkToken(): boolean {
		const local = this.AuthenticationService.userValue;
		if (local) {
			return true;
		}
		return false;
	}

	handleClickLoginButton() {
		this.Router.navigate(["/login"], {});
	}
}
