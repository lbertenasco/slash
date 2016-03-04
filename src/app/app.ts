import {Component, OnInit, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {AuthRouteComponent} from './auth/routes/auth-route.component';
import {HomeComponent} from './home/home.component';
import {LandingComponent} from './landing/landing.component';
import {NavigationComponent} from './navigation/navigation.component';
import {AuthDispatcher} from "./auth/auth.dispatcher";
import {AuthService} from "./auth/auth.service";
import {state, AppState} from "./app.state";
import {Observable} from "rxjs/Observable";
import {User} from "./user/user.model";
import {AuthApi} from "./auth/auth.api";


 @Component({
  selector: 'sl-app',
  providers: [
      ...FORM_PROVIDERS,
      AuthApi,
      AuthDispatcher,
      AuthService
  ],
  directives: [
    ...ROUTER_DIRECTIVES,
    HomeComponent,
    LandingComponent,
    NavigationComponent,
  ],
  pipes: [],
  styles: [ require('./app.css') ],
  template:  require('./app.html')
})

@RouteConfig([
    { path: '/', component: LandingComponent, name: 'Index' },
    { path: '/auth', component: AuthRouteComponent, name: 'Auth'},
    { path: '/slash/:slashid', component: HomeComponent, name: 'Slash' },
    { path: '/**', redirectTo: ['Index'] }
])
export class App implements OnInit {

     public user:User;

     constructor(private authDispatcher:AuthDispatcher,
                 private authService:AuthService,
                 private router:Router,
                 @Inject(state) private state$:Observable<AppState>) {

         this.state$
             .map(state => state.auth.user)
             .distinctUntilChanged()
             .subscribe(user => this.user = user);
     }

     ngOnInit() {
         if (this.authService.isLogged()) {
             // Auto login
             this.authDispatcher.login();
         } else {
             // Facebook login required
             // FIXME generates an exception when running with webpack...
             //this.router.navigate(['Auth']);
         }
     }

     onLogoutClick() {
         this.authDispatcher.logout();
     }


}
