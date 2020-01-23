import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // localhost:4200/users
    { path: 'users', component: UsersComponent, children: [
      // the colon means its a dynamic piece of the route
      { path: ':id/:name', component: UserComponent }
    ] },

    {
        path: 'servers',
        // canActivate can guard against unauthorized access to an entire route, or..
        // canActivate: [AuthGuard],
        // canActivateGuard can guard against just the child route
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    { path: 'not-found', component: PageNotFoundComponent },
    // this is a wildcard route - catch them all and redirect somewhere.
    // this must be the last route declared here because the routes get parsed from top to bottom
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}