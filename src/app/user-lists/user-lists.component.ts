import { Component, OnInit, OnChanges } from '@angular/core';
import { UserListsService } from './user-lists.service';
import { UserList } from "./user-lists";
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PageStatusService } from '../services/page-status';
import { environment } from '../../environments/environment';

import { CookieService } from 'ngx-cookie-service';

class FilterForm {
	search: String;
	fromAge: String;
	toAge: String;
	position: String;
	fromHeight: String;
	toHeight: String;
	fromWeight: String;
	toWeight: String;
	video: String;
}
@Component({
	selector: 'app-user-lists',
	templateUrl: './user-lists.component.html',
	styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  	public filterForm: FilterForm;
	public user_lists: UserList[];
	public is_closed: boolean = false;
	public selected_index = -1;
	public is_details_loaded: boolean = false;
		public serverUrl: string = environment.apiUrl;

	constructor(
		private userListsService: UserListsService,
		private router: Router,
		private route: ActivatedRoute,
		private pageStatusService: PageStatusService,
	) { 
		route.params.subscribe(val => {
			this.initialiseInvites();
		});
	}

	ngOnInit() {
	}

	initialiseInvites() {
		this.userListsService.getUser().subscribe(user => {
			console.log('user=', user);
		});
		this.pageStatusService.setStatus('user-lists');
		this.is_details_loaded = false;
		this.filterForm = new FilterForm;
		if (this.route.snapshot.params['search'] && this.route.snapshot.params['search'] != 'null')
			this.filterForm.search = this.route.snapshot.params['search'];
		if (this.route.snapshot.params['fromAge'])
			this.filterForm.fromAge = this.route.snapshot.params['fromAge'];
		if (this.route.snapshot.params['toAge'])
			this.filterForm.toAge = this.route.snapshot.params['toAge'];
		if (this.route.snapshot.params['position'])
			this.filterForm.position = this.route.snapshot.params['position'];
		if (this.route.snapshot.params['fromHeight'])
			this.filterForm.fromHeight = this.route.snapshot.params['fromHeight'];
		if (this.route.snapshot.params['toHeight'])
			this.filterForm.toHeight = this.route.snapshot.params['toHeight'];
		if (this.route.snapshot.params['fromWeight'])
			this.filterForm.fromWeight = this.route.snapshot.params['fromWeight'];
		if (this.route.snapshot.params['toWeight'])
    		this.filterForm.toWeight = this.route.snapshot.params['toWeight'];
		if (this.route.snapshot.params['video'])
			this.filterForm.video = this.route.snapshot.params['video'];
		console.log(this.filterForm.search )
		this.userListsService.getUserLists(this.filterForm).subscribe(user_lists => {
			this.user_lists = user_lists;
			this.is_details_loaded = true;
			console.log(user_lists)}
		);
	}

	gotoUserProfile(jugador: UserList, i) {
		this.is_closed = true;
		this.selected_index = i;
		setTimeout(() => this.router.navigate(['/user-profile/', jugador.slug]), 400);
	}

	getUbicacion(provincia, code) {
		if (provincia && code){
			return provincia + " " + code;
		}
		return "";
	}
}
	