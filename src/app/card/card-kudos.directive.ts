import {Directive, ElementRef, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs';

import {CardService} from './card.service';


@Directive({
  selector: '[sl-kudos]',
  outputs: [ 'kudos', 'animation' ]
})

export class CardKudosDirective {
  kudos: EventEmitter<Boolean> = new EventEmitter();
  animation: EventEmitter<Boolean> = new EventEmitter();

  constructor(private elementRef: ElementRef, private CardService:CardService) {
  }

  ngOnInit() {
    this.subscribeKudos()
    this.subscribeAnimation()
  }
  subscribeKudos(){
    Observable.fromEvent(this.elementRef.nativeElement, 'mouseenter')
      .delay(1000)
      .takeUntil(Observable.fromEvent(this.elementRef.nativeElement, 'mouseleave'))
      .subscribe(
        (d) => this.kudos.next(true),
        (e) => console.log(e),
        () => this.subscribeKudos()
        // This is for testing only. You shoud give kudos only once per card.
      )
  }
  subscribeAnimation(){
    /* Should merge Observables? maybe its cleaner this way...*/
    Observable.fromEvent(this.elementRef.nativeElement, 'mouseenter')
    .subscribe((d) => this.animation.next(true));
    Observable.fromEvent(this.elementRef.nativeElement, 'mouseleave')
    .subscribe((d) => this.animation.next(false));
  }

}
