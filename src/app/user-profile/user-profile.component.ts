import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserProfile } from '../user-profile/user-profile';
import { UserProfileService } from './user-profile.service';
import { PageStatusService } from '../services/page-status';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
declare var $: any;

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	public openedCategory: boolean[] = [];
	public openedSelectDialog: boolean[] = [];
	public jugador: UserProfile;
	public slug: string;
	public is_details_loaded = false;
	public comeOutAnimation = "fadeIn";
	public ball_index = -1;
	public ballName = [
		'Perfil',
		'Trayectoria',
		'Biografía',
		'Imágenes Videos',
		'Valuación',
		'Redes',
	];

	public iconName = [
		'info_outline',
		'trending_up',
		'share',
		'image_outline',
		'share',
		'share'
	];

	public categoryName = [
		'Perfil',
		'Trayectoria',
		'Biografía',
		'ImágenesVideos',
		'Valuación',
		'Redes',
		'Perfil',
		'last',
	];
	public dialogName = [
		'confirm',
		'done',
	];
	public mouseDown: boolean = false;
	public preX: any;
	public curX: any;
	public eventUp: any;
	public eventDown: any;
	public interval;
	public index;
	public selected_category;
	public selected_dialog;
	public selectedPlayers: UserProfile[] = [];
	public selectedIds: string[] = [];
	public serverUrl: string = environment.apiUrl;
	public selectePlayerName: string = '';
	public title: string = '';
	public message: string = '';

	@ViewChild("categoryList") category: ElementRef;
	@ViewChild("next") next: ElementRef;
	@ViewChild("previous") previous: ElementRef;
	@ViewChild("next_category") next_category: ElementRef;
	@ViewChild("previous_category") previous_category: ElementRef;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public userProfileService: UserProfileService,
		private pageStatusService: PageStatusService,
		private photoSwipeComponent: PhotoSwipeComponent,
	) {
		route.params.subscribe(val => {
			clearInterval(this.interval);
			this.format();
		});
	}

	ngOnInit() {
		this.selected_dialog = -1;
		for (let i = 0; i < 6; i++) {
			this.openedCategory.push(false);
		}
		for (let i = 0; i < 2; i++) {
			this.openedSelectDialog.push(false);
		}
	}

	format(type = 0) {
		this.selected_category = -1;
		this.ball_index = -1;
		this.index = 7;
		setTimeout(() => this.index = -1, 1450);
		this.interval = setInterval(() => {
			this.ball_index++;
			this.index++;
			setTimeout(() => {
				if (this.next) {
					let el: HTMLElement = this.next.nativeElement as HTMLElement;
					el.click();
				}
			}, 1450);
			if (this.ball_index == 6) {
				this.ball_index = 0;
				setTimeout(() => {
					this.index = 7;
					setTimeout(() => this.index = 0, 10);
				}, 1000);
			}
		}, 1500);
		this.pageStatusService.setStatus('user-profile');
		this.slug = this.route.snapshot.params['slug'];
		for (let i = 0; i < 6; i++) {
			this.openedCategory[i] = false;
		}
		this.is_details_loaded = false;
		this.userProfileService.getUserProfile(this.slug, type).subscribe(jugador => {
			this.jugador = jugador;
			console.log("player", this.jugador);
			console.log("slug", this.slug);
			this.is_details_loaded = true;
			this.slug = this.jugador.slug;
			setTimeout(() => this.openedCategory[0] = true, 750);
			setTimeout(() => this.openedCategory[1] = true, 1500);
			setTimeout(() => this.openedCategory[2] = true, 2250);
		})
		this.userProfileService.getUserMedia(this.slug, type).subscribe(res => {
			this.userProfileService.images = res;
			console.log("images=", this.userProfileService.images);
			this.userProfileService.images.forEach(element => {
				if (element.path.match(new RegExp("https://youtu.be/", "i"))) {
					element.fileType = 'video';
					element.path = element.path.replace(new RegExp("https://youtu.be/", "i"), "https://www.youtube.com/embed/");
				}
				else{
					element.fileType = 'image';
					element.path = this.serverUrl + '/' + element.path;
				}
			});
			console.log("images=", this.userProfileService.images);
		})
	}

	initialize(jugador) {
	}

	getUbicacion(provincia, code) {
		if (provincia && code) {
			return provincia + " " + code;
		}
		return "";
	}

	formatHeight(num) {
		let str: string = num.toString();
		let retval = "";
		for (let i = str.length - 1; i >= 0; i--) {
			if ((str.length - i) == 3) retval = ',' + retval;
			retval = str[i] + retval;
		}
		return retval;
	}

	previousProfile() {
		this.userProfileService.getUserProfile(this.slug, 1).subscribe(jugador => {
			if (jugador.slug)
				this.router.navigate(['/user-profile/', jugador.slug])
		});
	}

	nextProfile() {
		this.userProfileService.getUserProfile(this.slug, 2).subscribe(jugador => {
			if (jugador.slug)
				this.router.navigate(['/user-profile/', jugador.slug])
		});
	}

	gotoUserList() {
		this.router.navigate(['/']);
	}

	selectCategory(cate_index) {
		this.selected_category = cate_index;
		setTimeout(() => {
			for (let i = 0; i < this.selected_category; i++) {
				let el: HTMLElement = this.next_category.nativeElement as HTMLElement;
				el.click();
			}
		}, 100);
	}

	onMouseUp(e) {
		this.eventUp = e;
		this.curX = e.clientX;
		console.log(this.eventUp.target);
		if(this.eventUp.target.className != 'ng2-carouselamos-wrapper'){
			if (this.mouseDown) {
				if (Math.abs(e.clientX - this.preX) > 50) {
					if (e.clientX - this.preX < 0 && this.selected_category < 5) {
						if (Math.abs(e.clientX - this.preX) < 260) {
							let el: HTMLElement = this.next_category.nativeElement as HTMLElement;
							el.click();
							console.log("first next instruction");
						}
						console.log("this.selected_category++");
						this.selected_category++;
					}
				}
				if (this.selected_category > 0) {
					if(e.clientX - this.preX >= 0){
						if (Math.abs(e.clientX - this.preX) <= 50) {
							let el: HTMLElement = this.next_category.nativeElement as HTMLElement;
							el.click();
							console.log("second next instruction");
						} 
						else{
							this.selected_category--;
							console.log("this.selected_category--");
						}
					}
					 
						
				}
				this.mouseDown = false;
				console.log("this.mouseDown = false");
			}
		}
		else{
			if ((this.preX - e.clientX ) <= 0.1){
				let el: HTMLElement = this.next_category.nativeElement as HTMLElement;
				el.click();
				console.log("third next instruction");
			}
			console.log("third next instruction mismatch");
		}
	}

	onSelectedItem(e){
		console.log("selected=", e);
	}

	onMouseDown(e) {
		console.log("this.mouseDown = true;");
		this.eventDown = e;
		this.mouseDown = true;
		this.preX = e.clientX;
	}

	closeCategory() {
		this.selected_category = -1;
		console.log("close category");
	}

	selectPlayer() {
		if(!this.selectedPlayers.some( item => item.id == this.jugador.id )){
			this.selectedPlayers.push(this.jugador);
		}
	}

	confirmPlayer(){
		this.selected_dialog = 0;
		this.selectePlayerName = '';
		this.selectedPlayers.forEach(element => {
			this.selectePlayerName = this.selectePlayerName + (this.selectePlayerName? ', ' : '') + element.nombre;
		});
	}
	requestPlayer(){
		this.selectedPlayers.forEach(element => {
			this.selectedIds.push(element.id);
		});
		this.userProfileService.requestPlayer(this.selectedIds).subscribe(
			(res: any) => {
				this.selected_dialog = 1;
				this.title = "Felicitaciones!"
				this.message = "Nuestros resentantes asociados se pondran encontacto a la brevedad.";
			},
			(err: HttpErrorResponse) => {
				this.selected_dialog = 1;
				this.title = "Felicitaciones!"
				this.message = "Nuestros resentantes asociados se pondran encontacto a la brevedad.";
			}
		);
	}

	cancelRequest(){
		this.selected_dialog = -1
		this.selectedPlayers = [];
	}
	requestPlayerFinish(){
		this.selected_dialog = -1; 
		this.selectedPlayers = [];
	}

}
