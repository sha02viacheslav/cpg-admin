import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menu_opened: boolean = false;
  
  @Input('search') search:string;
  @Output() filterData = new EventEmitter<FormGroup>();

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    $(".nicescrollable").niceScroll({
			cursorcolor: "#216a94",
			cursorborder: '#216a94',
			autohidemode: true,
			background: "#aaa",
			cursorminheight: 15,
			cursorborderradius: 15,
			cursorwidth: 6,
			cursoropacitymin: 0.1,
		});
		$(".nicescrollable").mouseover(function () {
			$(".nicescrollable").getNiceScroll().resize();
		});
  }

  public gotoHome() {
    this.router.navigate(['/']);
  }

  onFilter(filterData) {
    this.filterData.emit(filterData);
  }

  onMenuChanged(menu_opened) {
    this.menu_opened = menu_opened;
  }

  goBack() {
		this.location.back();
	}
}
