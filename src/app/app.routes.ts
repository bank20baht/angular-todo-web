import { Routes } from '@angular/router';
import { LoginComponent, TodoComponent } from './modules';
import { PageNotFoundComponent } from './shared';

export const routes: Routes = [
    {
		path: "",
		component: TodoComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
    { path: "**", component: PageNotFoundComponent },
];
