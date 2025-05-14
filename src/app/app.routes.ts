import { Routes } from '@angular/router';
import { LoginComponent, TodoComponent } from './modules';
import { PageNotFoundComponent } from './shared';
import { TodoGuard } from './guard';

export const routes: Routes = [
    {
		path: "",
		component: TodoComponent,
        canActivate: [TodoGuard],
	},
	{
		path: "login",
		component: LoginComponent,
	},
    { path: "**", component: PageNotFoundComponent },
];
