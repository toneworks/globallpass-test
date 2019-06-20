import {EventEmitter, Injectable, Output} from '@angular/core';
import {RequestService} from './request.service';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // tslint:disable-next-line:variable-name
  private _books = [];
  public get books() {
    return this._books;
  }

  // tslint:disable-next-line:variable-name
  private _langs = [];
  public get langs(){
    return this._langs;
  }

  // tslint:disable-next-line:variable-name
  private _authors = [];
  public get authors() {
    return this._authors;
  }

  private _genres = [];
  public get genres(){
    return this._genres;
  }

  private _booksChanged;

  addOrUpdateBook(book, title, authorId, desc, pageCount, langId, genre) {
    this._booksChanged = true;
    let id;
    if(!book) {
      id = this.guid();
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
        this._genres = [];
        for (let i = 0; i < this._books.length; i++)
          if (!this._genres.find(genre => genre.name == this._books[i].genre))
            this._genres.push({name: this._books[i].genre});
      }
    }

    book.synchronizing();
    this.request.get({
      'id': id||'',
      'method': 'addOrUpdateBook',
      'title': title||'',
      'authorId': authorId||'',
      'description': desc||'',
      'pageCount': pageCount||'',
      'langId': langId||'',
      'genre': genre||''
    }).subscribe(answer => {
      if(answer.status==200)
        book.synchronized();
      else {
        alert('There was a server error, the data is not saved!');
      }
    }, answer =>{
      alert('There was unknown error, the data is not saved!');
      book.synchFailed();
    });
  }

  getAuthor(authorId) {
    // tslint:disable-next-line:triple-equals
     return this._authors.find(author => author.id == authorId)||{};
  }

  getLang(langId){
    return this._langs.find(lang => lang.id == langId)||{};
  }

  addAuthor(name = '') {
    const id = this.guid();
    this._authors.push({id: id, name: name});
    this.request.get({
      'method': 'addAuthor',
      'id': id,
      'name': name
    }).subscribe(answer => {
    });
  }

  authorChanged(author, newValue){
    author.name = newValue;
    this.request.get({
      'method': 'changeAuthor',
      'id': author.id,
      'newValue': newValue
    }).subscribe(answer => {
    });
  }

  booksChanged() {
    if(this._booksChanged) {
      this._booksChanged = false;
      return true;
    }
    return false;
  }

  addLang(lang){
    const newId = this.guid();
    this.request.get({
      method: 'addLang',
      id: newId,
      name: lang
    }).subscribe(answer => {
      if(answer.status==200)
        this._langs.push({id: newId, name: lang});
      else
        alert('Server error adding language');
    });
  }

  constructor(private request: RequestService) {
    this.request.get({
      method: 'getData'
    }).subscribe(answer => {
      for (let i = 0; i < answer.data.books.length; i++) {
        const book = answer.data.books[i];
        this._books.push(new Book(book.title, book.authorId, book.desc, book.pageCount, book.langId, book.genre, book.id));
        if(!this._genres.find(genre => genre.name==book.genre))
          this._genres.push({name: book.genre});
      }
      this._authors = answer.data.authors;
      this._langs = answer.data.langs;

      this._booksChanged = true;
    }, error => {console.log(error); alert('Server error receiving data')});
  }
}
