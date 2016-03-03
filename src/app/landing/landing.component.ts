import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {LandingService} from './landing.service';
import {LandingState} from './landing.state';

import {Observable} from 'rxjs';

@Component({
  selector: 'sl-landing',
  providers: [
    LandingService,
    LandingState,
  ],
  directives: [
    ROUTER_DIRECTIVES,
    FORM_DIRECTIVES,
  ],
  pipes: [ ],
  styles: [ require('./landing.style.css') ],
  template: require('./landing.view.html')
})
export class LandingComponent {

  trendings$:Observable<any[]>;
  constructor(
    public LandingService:LandingService,
    public LandingState:LandingState,
    private _router: Router) {

  }

  ngOnInit() {
    console.log('INIT: LandingComponent');
    this.trendings$ = this.LandingState.trendings;
    let self = this;
    this.LandingService.getTrendingSlashes().subscribe(
        (trending) => {
          console.log("raw trendings");
          console.log(trending);
          return self.LandingState.setTrendings(trending)
        },
        (error) => {
            console.warn( "Trending request failed." );
            console.log( error );
        }
    );
  }

  selectSlash(trending) {
    this._router.navigate( ['Slash', { slashid: trending.name}] );
  }


}
