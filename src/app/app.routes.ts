import { Routes } from '@angular/router';
import { AdminComponent, LoginComponent, TodoComponent } from './modules';
import { PageNotFoundComponent } from './shared';
import { CorbApproveGuard, CorbManagementGuard } from './guard';

export const routes: Routes = [
    {
		path: "todo",
		component: TodoComponent,
        canActivate: [CorbManagementGuard],
	},
	{
		path: "admin",
		component: AdminComponent,
        canActivate: [CorbApproveGuard],
	},
	{
		path: "login",
		component: LoginComponent,
	},
    { path: "**", component: PageNotFoundComponent },
];
