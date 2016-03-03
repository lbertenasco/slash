import {Injectable} from 'angular2/core'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

//import {Slash} from '../slash/slash.model';

let initialTrendings: any[] = [];

@Injectable()
export class LandingState {

	trendings: ReplaySubject<any[]> = new ReplaySubject(1);
	updates: Subject<any> = new Subject<any>();
	updateTrendings: Subject<any> = new Subject<any>();

	constructor() {
		this.updates
			.scan((accumulator: Object[], operation: Function) => {
					return operation(accumulator);
					}, initialTrendings)
				.subscribe(this.trendings);

		this.updateTrendings
			.map((trendings) => {
				return (state) => {
					return state = state.concat(trendings);
				}
			})
			.subscribe(this.updates);

	}

	setTrendings(trendings) {
		this.updateTrendings.next(trendings)
	}


}
