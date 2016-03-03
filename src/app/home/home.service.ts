import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs';

@Injectable()
export class HomeService {

  constructor(private _http: Http) {

  }

  getSlash() {
    return this._http.get('/assets/mock/slash.json')
    .map(( value:any ) => value.json())
    .catch(( error ) => {
      try {
          var response:any = error.json();
      } catch ( jsonError ) {
          var response:any = {
              code: -1,
              message: "Something went horribly wrong."
          };
      }
      return( Observable.throw( response ) );
    }).map((data:any) => data.slash || data);

  }

}
