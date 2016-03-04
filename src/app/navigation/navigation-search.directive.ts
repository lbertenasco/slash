import {Directive, ElementRef, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs';

import {NavigationService} from './navigation.service';


@Directive({
  selector: 'input[type=text][sl-autosearch]',
  outputs: [ 'results' ]
})

export class NavigationSearchDirective {
  // This should be EventEmitter<SlashSearch[]>
  results: EventEmitter<Object[]> = new EventEmitter();

  constructor(private elementRef: ElementRef, private NavigationService:NavigationService) {
  }

  ngOnInit() {
    Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .debounceTime(1000)
      .distinctUntilChanged()
      .map(e => e['target'].value)
      .filter(text => text.length > 2)
      .map(slash => this.NavigationService.searchSlash(slash))
      .mergeAll()
      .subscribe(data => this.results.next(data))
  }

}
