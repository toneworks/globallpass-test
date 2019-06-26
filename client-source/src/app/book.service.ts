import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {Book} from './book';
import {DataService} from './data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public justLoaded;
  private justLoadedSubscriber;

  // tslint:disable-next-line:variable-name
  private _books = [];
  public get all(){
    return this._books;
  }

  // tslint:disable-next-line:variable-name
  private _genres = [];
  public get genres(){
    return this._genres;
  }

  public get length(){
    if(this._books)
      return this._books.length;
    return [];
  }

  // tslint:disable-next-line:variable-name
  private _booksChanged;
  public get changed() {
    const changed = this._booksChanged;
    this._booksChanged = false;
    return changed;
  }

  // tslint:disable-next-line:variable-name
  private _loaded = false;
  public get loaded() {
    return this._loaded;
  }

  addOrUpdateBook(book, title, authorId, desc, pageCount, langId, genre) {
    this._booksChanged = true;
    let id;
    if(!book) {
      id = this.data.guid();
      book = new Book(title, authorId, desc, pageCount, langId, genre, id);
      this._books.push(book);
      if(!this._genres.find(genr => genr.name == genre))
        this._genres.push({name: book.genre});
    }
    else {
      id = book.id;
      let genreChanged = false;
      if(book.genre !== genre)
        genreChanged = true;

      book.update(title, authorId, desc, pageCount, langId, genre);
      if(genreChanged) {
        // Обновление массива жанров
        this._genres = [];
        for (let i = 0; i < this._books.length; i++)
          if (!this._genres.find(curGenre => curGenre.name === this._books[i].genre)&&this._books[i].genre.length>0)
            this._genres.push({name: this._books[i].genre});
      }
    }

    this.request.post('/books', book.data).subscribe(() => {});
  }

  public byId(id) {
    return this._books.find(book => book.id === id);
  }

  constructor(private request: RequestService, private data: DataService) {
    this.justLoaded = new Observable(subscriber => this.justLoadedSubscriber = subscriber);
    this.request.get('/books').subscribe((answer) => {
      this._booksChanged = true;
      this._loaded = true;
      for(let i = 0; i < answer.length; i++) {
        const book = answer[i];
        this._books.push(new Book(book.title, book.authorId, book.description, book.pageCount, book.langId, book.genre, book.id));
        if(book.genre.length>0 && !this._genres.find(genre => genre.name == book.genre))
          this._genres.push({name: book.genre});
      }
      if(this.justLoadedSubscriber)
        this.justLoadedSubscriber.next();
    });
  }
}
