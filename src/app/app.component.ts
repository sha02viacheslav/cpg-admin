import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PageStatusService } from './services/page-status';
import { transition, trigger, query, style, animate, group, animateChild } from '@angular/animations';
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss', './loader.scss'],
	animations: [
		trigger('Animation1', [
			transition('* => *', group([
				query(
					':leave',
					[style({ 'margin-top': '0%' }), animate('0.3s', style({ 'margin-top': '100%' }))], { optional: true }
				),
				query( 
					':enter',
					[style({ 'margin-top': '-100%' }), animate('0.3s', style({ 'margin-top': '0%' }))], { optional: true }
				),
			])),
		]),
		trigger('Animation2', [
			transition('* => *', group([
				query(
					':leave',
					[style({ 'opacity': '1' }), animate('0.3s', style({ 'opacity': '0' }))], { optional: true }
				),
				query(
					':enter',
					[style({ 'opacity': '0' }), animate('0.3s', style({ 'opacity': '1' }))], { optional: true }
				),
			])),
		]),
	]
})
export class AppComponent implements OnInit, AfterViewInit {
	title = 'cpg';
	filterData: FormGroup;
	search: string = null;
	isUserList: boolean = false;
	filterForm = new FormGroup({
		search: new FormControl(''),
		fromAge: new FormControl(''),
		toAge: new FormControl(''),
		position: new FormControl('0'),
		fromHeight: new FormControl(''),
		toHeight: new FormControl(''),
		fromWeight: new FormControl(''),
		toWeight: new FormControl(''),
		video: new FormControl(false),
	});
	innerWidth: number;
	backgroundPosition;
	number = 0;
	constructor(
		private router: Router,
		public pageStatusService: PageStatusService
	) {};

	ngOnInit() {
		$("#main-nicescrollable").niceScroll({
			cursorcolor: "#216a94",
			cursorborder: '#216a94',
			autohidemode: true,
			background: "#aaa",
			cursorminheight: 15,
			cursorborderradius: 15,
			cursorwidth: 6,
			cursoropacitymin: 0.1,
		});
	}; 
	ngAfterViewInit(){

		setInterval(() => {
			$("#main-nicescrollable").getNiceScroll().resize();
			this.playBackground();
		}, 100);
	}

	playBackground(){
		var playPromise = $("#video")[0].play();
		if (playPromise !== undefined) {
			playPromise.then(_ => {
			})
			.catch(error => {
			});
		}
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}
	
	onFilter(filterData) {
		this.filterForm = filterData;
		this.search = this.filterForm.value.search;
		this.router.navigate(['/user-lists/', this.filterForm.value]);
	}

	onSubmit() {
		this.router.navigate(['/user-lists/', this.filterForm.value]);
	}
}
