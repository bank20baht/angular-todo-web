import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationService } from "@/services";

export const CorbManagementGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const authenticationService = inject(AuthenticationService);

	const user = authenticationService.userValue;

	if (user?.roles === "CORB" || user?.roles === "CORS") {
		return true;
	} else {
		return router.createUrlTree(["/denied"]);
	}
};
