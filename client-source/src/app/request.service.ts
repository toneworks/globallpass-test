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

  get(path): Observable<any> {
    return this.http.get(this.url + path);
  }

  post(path, data): Observable<any> {
    return this.http.post(this.url + path, data);
  }

  constructor(private http: HttpClient) {
  }
}
