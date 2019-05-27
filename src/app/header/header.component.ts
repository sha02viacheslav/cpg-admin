import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(
		private navigationComponent: NavigationComponent,
		private location: Location,
    public router: Router,
	) {}

	ngOnInit() {
		console.log(this.router.url);
	}

	gotoHome() {
		this.navigationComponent.gotoHome();
	}

	goBack() {
		this.navigationComponent.gotoHome();
	}

}
