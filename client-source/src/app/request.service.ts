import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/mergeMap';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
// import { sha3_224 } from 'js-sha3';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = environment.apiUrl;

  get(request_object: object): Observable<any> {
    // const requestString = JSON.stringify(request_object);
    // request_object['signature'] = sha3_224(requestString + sign);
    const obs = this.http.get(this.url + '/?' + JSON.stringify(request_object));
    return obs;
    //.flatMap((answer: any) => {
    //   return Observable.create((observer) => {
    //     observer.next(answer);
    //   });
    // });
  }

  constructor(private http: HttpClient) {
  }
}
