import {Injectable} from 'angular2/core'
import {Subject, ReplaySubject, Observable} from 'rxjs';

import {Card} from './card.model';

let initialCards: Card[] = [];

@Injectable()
export class CardState {

  cards: ReplaySubject<any[]> = new ReplaySubject(1);
	updates: Subject<any> = new Subject<any>();
	create: Subject<any> = new Subject<any>();
	delete: Subject<any> = new Subject<any>();
	markAsFavorite: Subject<any> = new Subject<any>();


	constructor() {

		this.updates
			.scan((cards: Card[], operation: Function) => {
					return operation(cards);
					}, initialCards)
				.subscribe(this.cards);

    this.delete
			.map((card) => {
				return (cards) => {
					return cards = cards.filter((c) => c.id !== card.id)
				}
			})
			.subscribe(this.updates);

      this.create
      .map((card) => {
        return (cards) => {
          return cards = [].concat(card).concat(cards);
        }
      })
      .subscribe(this.updates);


		this.markAsFavorite
			.map((card) => {
				return (cards) => {
					return cards.map((c) => {
            if(c.id == card.id) return Object.assign({}, c, {
              favorited: true, likes: c.likes + 1 || 1
            });
            return c;
					})
				}
			})
			.subscribe(this.updates)
	}

	addCard(card:Card):void {
		this.create.next(card)
	}
  likeCard(card: Card): void {
    this.markAsFavorite.next(card);
  }

}
