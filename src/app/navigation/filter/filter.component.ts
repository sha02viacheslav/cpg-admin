import { Component, OnInit, Output, EventEmitter, Input, HostListener, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterService } from './filter.service';
import { PageStatusService } from '../../services/page-status';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {
  
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

  posicion: string;
  positionDatas: string[];
  is_details_loaded: boolean = false;
  menu_opened: boolean = false;

  @Input('search') search: string;

  @Output() filterData = new EventEmitter<FormGroup>();
  @Output() menuChanged = new EventEmitter<boolean>();

  @ViewChild("filterMenu", {read: ElementRef}) filterMenu: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.filterMenu.nativeElement.contains(event.target)) {
      this.menu_opened = true;
      this.menuChanged.emit(this.menu_opened);
    } else {
      this.menu_opened = false;
      this.menuChanged.emit(this.menu_opened);
    }
  }

  constructor(private router: Router,
              private filterService: FilterService,
              public pageStatusService: PageStatusService) {
    
  }

  onSubmit() {
    this.menu_opened = false;
    this.menuChanged.emit(this.menu_opened);
    this.filterData.emit(this.filterForm);
    // this.router.navigate(['/user-lists/', this.filterForm.controls]);
  }

  ngOnChanges() {
    this.is_details_loaded = false;
    this.filterService.getPosition().subscribe(position => {
      this.positionDatas = position;
      this.is_details_loaded = true;
    })
  }

  onClickPopupButton() {
    this.menu_opened = !this.menu_opened;
    this.menuChanged.emit(this.menu_opened);
  }
}
