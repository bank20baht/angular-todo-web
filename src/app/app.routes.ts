import { Routes } from '@angular/router';
import { LoginComponent, TodoComponent } from './modules';

export const routes: Routes = [
    {
		path: "",
		component: TodoComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
];
