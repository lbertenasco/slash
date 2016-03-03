import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {HomeComponent} from './home/home.component';
import {LandingComponent} from './landing/landing.component';
import {NavigationComponent} from './navigation/navigation.component';


 @Component({
  selector: 'sl-app',
  providers: [ ...FORM_PROVIDERS ],
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
  { path: '/:slashid', component: HomeComponent, name: 'Slash' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  constructor() {

  }
}
