import {Component, Input} from 'angular2/core';
import {CommentComponent} from '../comment/comment.component';
import {CardService} from './card.service';
import {CardKudosDirective} from './card-kudos.directive';
import {CardState} from './card.state';
import {Card} from './card.model';

@Component({
  selector: 'card-renderer',
  providers: [ CardService ],
  directives: [ CardKudosDirective ],
  template: require('./card.view.html'),
  styles: [ require('./card.style.css') ]
})

export class CardComponent {
  @Input() card:Card;
  animate:boolean;

  constructor(public CardService:CardService, public CardState:CardState){

  }

  ngOnInit(){
    console.log("INIT: CardComponent");
  }

  likeCard(card:Card) {
    console.log("KUDOS!");
    this.CardState.likeCard(card);
  }

}
