import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {HomeService} from './home.service';

import {CardComponent} from '../card/card.component';
import {CardState} from '../card/card.state';
import {Card} from '../card/card.model';
import {Observable} from 'rxjs';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    HomeService,
    CardState
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    FORM_DIRECTIVES,
    CardComponent
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.style.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.view.html')
})
export class HomeComponent {
  routeParam: RouteParams;
  // Set our default values
  slash: String;
  data = {};
  cards$:Observable<Card[]>;
  // TypeScript public modifiers
  constructor(
    public HomeService:HomeService,
    public CardState:CardState,
    routeParams: RouteParams) {
      this.slash = routeParams.get('slashid');
      console.log("SLASH PARAM");
      console.log(this.slash);

  }

  ngOnInit() {
    console.log('INIT: HomeComponent');
    this.cards$ = this.CardState.cards;
    let self = this;
    this.HomeService.getSlash().subscribe(
        function handleValue( data ) {
          console.log("slash data");
          console.log(data);
          data.cards.forEach((card) => self.CardState.addCard(new Card(card))
          );
        },
        function handleError( error ) {
            console.warn( "Cards request failed." );
            console.log( error );
        }
    );
  }

  addRandomCard() {
    console.log("addRandomCard");
    this.CardState.addCard(new Card({
    text: Math.random().toString()
    }));
  }

}
