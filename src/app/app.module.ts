import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './navigation/filter/filter.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

//services
import { UserListsService } from './user-lists/user-lists.service';
import { FilterService } from  './navigation/filter/filter.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { AppHttpClient } from './http-client';
import { PageStatusService } from  './services/page-status';
import { Ng2CarouselamosModule } from './ng2-carouselamos';
import { CategoryComponent } from './user-profile/category/category.component';
// import { CloseButtonComponent } from './user-profile/category/close-button/close-button.component';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { PhotoSwipeComponent } from './user-profile/photo-swipe/photo-swipe.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FilterComponent,
    UserListsComponent,
    UserProfileComponent,
    CategoryComponent,
    PhotoSwipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2CarouselamosModule,
    PerfectScrollbarModule,
    MatGridListModule,
  ],
  providers: [
    AppHttpClient,
    UserListsService,
    FilterService,
    UserProfileService,
    PageStatusService,
    NavigationComponent,
    CookieService,
    PhotoSwipeComponent,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    MatGridListModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
providers: [
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
]