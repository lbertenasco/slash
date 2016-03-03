import {Component, Input} from 'angular2/core';
import {CommentComponent} from '../comment/comment.component';
import {CardService} from './card.service';
import {CardState} from './card.state';
import {Card} from './card.model';

@Component({
  selector: 'card-renderer',
  providers: [ CardService ],
  template: require('./card.view.html'),
  styles: [ require('./card.style.css') ]
})

export class CardComponent {
  @Input() card:Card;

  constructor(public CardService:CardService, public CardState:CardState){

  }

  ngOnInit(){
    console.log("INIT: CardComponent");
  }

  removeCard(card:Card) {
    this.CardState.removeCard(card);
  }

}
