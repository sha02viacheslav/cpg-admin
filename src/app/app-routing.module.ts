import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserGuard } from './shared/guards/user-guard';
const routes: Routes = [
	{ path: '', redirectTo: 'user-lists', canActivate: [UserGuard], pathMatch: 'full' },
	{ path: 'user-lists', component: UserListsComponent,
		canActivate: [UserGuard], data: {animation: 'HomePage'} 
	},
	{ path: 'user-lists/:filterData', 
		component: UserListsComponent,
		canActivate: [UserGuard], data: {animation: 'HomePage'} 
	},
	{ path: 'user-profile/:slug', component: UserProfileComponent,
		canActivate: [UserGuard], data: {animation: 'AboutPage'} 
	},
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
