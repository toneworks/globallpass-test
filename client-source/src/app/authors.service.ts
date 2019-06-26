import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {DataService} from './data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  justAdded: Observable<any>;
  private justAddedSubscriber;

  justLoaded: Observable<any>;
  private justLoadedSubscriber;

  // tslint:disable-next-line:variable-name
  private _authors = [];
  public get all() {
    return this._authors;
  }

  public get length(){
    return this._authors.length;
  }

  // tslint:disable-next-line:variable-name
  private _loaded = false;
  public get loaded() {
    return this._loaded;
  }

  // tslint:disable-next-line:variable-name
  private _changed = false;
  public get changed(){
    const value = this._changed;
    this._changed = false;
    return value;
  }

  public name(id) {
    return (this._authors.find(author => author.id == id) || {}).name;
  }

  public addOrUpdateAuthor(newName = '', author?) {
    const curId = author ? author.id : this.data.guid();
    const newAuthor = {id: curId, name: newName};
    if(!author)
      this._authors.push(newAuthor);
    else
      this._authors.find(curAuthor => curAuthor.id === curId).name = newName;
    if(this.justAddedSubscriber)
      this.justAddedSubscriber.next(newAuthor);
    this.request.post('/authors', newAuthor).subscribe(answer => {}, error => console.log('error', error));
    this._changed = true;
  }

  constructor(private request: RequestService, private data: DataService) {
    this.request.get('/authors').subscribe(answer => {
      this._authors = answer;
      this._loaded = true;
      if(this.justLoadedSubscriber)
        this.justLoadedSubscriber.next();
    });
    this.justAdded = new Observable(subscriber => this.justAddedSubscriber = subscriber);
    this.justLoaded = new Observable(subscriber => this.justLoadedSubscriber = subscriber);
  }
}
