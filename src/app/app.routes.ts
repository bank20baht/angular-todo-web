import { Routes } from '@angular/router';
import { AdminComponent, LoginComponent, TodoComponent } from './modules';
import { PageNotFoundComponent } from './shared';
import { TodoGuard } from './guard';

export const routes: Routes = [
    {
		path: "todo",
		component: TodoComponent,
        canActivate: [TodoGuard],
	},
	{
		path: "admin",
		component: AdminComponent,
        canActivate: [TodoGuard],
	},
	{
		path: "login",
		component: LoginComponent,
	},
    { path: "**", component: PageNotFoundComponent },
];
