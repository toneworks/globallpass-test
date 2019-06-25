import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {DataService} from './data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangsService {

  justAdded: Observable<any>;
  private justAddedSubscriber;

  // tslint:disable-next-line:variable-name
  private _langs = [];

  public get all(){
    return this._langs || [];
  }

  public get length(){
    return this._langs.length;
  }

  public name(langId) {

    return (this._langs.find(lang => lang.id === langId)||{}).name;
  }

  public addLang(newName){
    // ...
    const newLang = {id: this.data.guid(), name: newName};
    this._langs.push(newLang);
    if(this.justAddedSubscriber)
      this.justAddedSubscriber.next(newLang);
    this.request.post('/langs', newLang).subscribe(answer => {}, error => console.log('error', error));
  }

  constructor(private request: RequestService, private data: DataService) {
    this.request.get('/langs').subscribe(answer => {
      this._langs = answer;
    });
    this.justAdded = new Observable(subscriber => this.justAddedSubscriber = subscriber);
  }
}
