import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { UserProfile } from '../../user-profile/user-profile';
import { environment } from '../../../environments/environment';
import { UserProfileService } from '../user-profile.service';
@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnChanges {

	@Input('jugador') jugador: UserProfile
	@Input('category_index') category_index: number;
	@Input('selected_index') selected_index: number;
	@Input('eventUp') eventUp: any;
	@Input('eventDown') eventDown: any;
	@Output() categoryClosed = new EventEmitter < boolean > ();
	@ViewChild("closeBtn") closeBtn: ElementRef;
	comeOutAnimation = "fadeIn";
	public serverUrl: string = environment.apiUrl;
	constructor(
		public userProfileService: UserProfileService,
	) {}

	ngOnChanges() {
		setTimeout(() => {
			if (this.eventUp && this.closeBtn &&
				this.closeBtn.nativeElement && this.closeBtn.nativeElement.contains(this.eventUp.target)
			) {
        this.categoryClosed.emit(true);
        console.log("close");
			}
		}, 100);

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
}