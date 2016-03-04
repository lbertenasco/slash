import {Component} from 'angular2/core';
import {NavigationService} from './navigation.service';
import {NavigationSearchDirective} from './navigation-search.directive';

@Component({
  selector: 'navigation',
  providers: [ NavigationService ],
  directives: [ NavigationSearchDirective ],
  pipes: [ ],
  styles: [ require('./navigation.style.css') ],
  template:  require('./navigation.view.html')
})

export class NavigationComponent {
  search:String;

  clickPlaceholder:string;
  constructor(public NavigationService:NavigationService) {

  }

  ngOnInit() {
    console.log('INIT: Navigation');
  }

  onSubmit() {
    console.log(this.search);
  }

}
