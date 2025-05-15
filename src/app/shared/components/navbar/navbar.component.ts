import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	tabs: { name: string; path: string }[] = [
		{ name: "Board", path: "todo" },
		{ name: "Admin", path: "admin" },
	];

	Router = inject(Router);

	handleChangeTab(tab: string): void {
		this.Router.navigate([tab]);
	}

	isActiveTab(tab: string): boolean {
		return this.Router.url.endsWith(tab);
	}
}
