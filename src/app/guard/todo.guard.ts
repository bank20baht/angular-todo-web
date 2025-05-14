import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationService } from "@/services";

export const CorbApproveGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const authenticationService = inject(AuthenticationService);

	const user = authenticationService.userValue;

	if (user) {
		return true;
	} else {
		return router.createUrlTree(["/denied"]);
	}
};