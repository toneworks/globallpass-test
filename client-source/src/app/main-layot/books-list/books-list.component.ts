import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {BookService} from '../../book.service';
import {LangsService} from '../../langs.service';
import {AuthorsService} from '../../authors.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  showCardValue = false;

  book;

  private filterChanged = false;

  // tslint:disable-next-line:variable-name
  private _filteredBooks;

  private titleFilter = '';

  private authorsFilter = [];

  private langsFilter = [];

  private pageCountFilter = {min: undefined, max: undefined};

  private genreFilter = [];

  showCard(book = false) {
    this.book = book;
    this.showCardValue = true;
  }

  closeCard() {
    this.book = false;
    this.showCardValue = false;
  }

  titleFilterChanged(titleFilterValue) {
    this.titleFilter = titleFilterValue;
    this.filterChanged = true;
  }

  authorFilterChanged(selectedOptions) {
    this.authorsFilter = [];
    for(let i = 0; i < selectedOptions.length; i++)
      this.authorsFilter.push(selectedOptions[i].id);
    this.filterChanged = true;
  }

  langFilterChanged(selectedOptions){
    this.langsFilter = [];
    for(let i = 0; i < selectedOptions.length; i++)
      this.langsFilter.push(selectedOptions[i].id);
    this.filterChanged = true;
  }

  pageCountFilterChanged(extreme, value){
    if(!value) {
      this.pageCountFilter[extreme] = undefined;
      value = undefined;
    }
    if(extreme==='min'&&value>this.pageCountFilter.max)
      this.pageCountFilter.max = Number(value);
    // if(extreme==='max'&&value<this.pageCountFilter.min)
    //   this.pageCountFilter.min = Number(value);
    this.filterChanged = true;
  }

  maxCountFilterAccept(value){
    if(value<this.pageCountFilter.min)
      this.pageCountFilter.min = Number(value);
    this.filterChanged = true;
  }

  genreFilterChanged(selectedOptions){
    this.genreFilter = [];
    for(let i = 0; i < selectedOptions.length; i++)
      this.genreFilter.push(selectedOptions[i].id);
    this.filterChanged = true;
  }

  private matchTitleFilter(book) {
    if(this.titleFilter.length > 0)
      return book.title.search(this.titleFilter) > -1 || book.desc.search(this.titleFilter) > -1;
    else
      return true;
  }

  private matchAuthorsFilter(book){
    if(this.authorsFilter.length>0) {
      for (let i = 0; i < this.authorsFilter.length; i++)
        if (this.authorsFilter[i] == book.authorId)
          return true;
      return false;
    }
    else
      return true;
  }

  private matchLangsFilter(book) {
    if(this.langsFilter.length > 0) {
      for (let i = 0; i < this.langsFilter.length; i++)
        if (this.langsFilter[i] == book.langId)
          return true;
      return false;
    }
    else
      return true;
  }

  private matchPageCountFilter(book){
    if(book.pageCount === null)
      book.pageCount = undefined;
    if(this.pageCountFilter.min)
      if(book.pageCount<this.pageCountFilter.min)
        return false;
    if(this.pageCountFilter.max)
      if(book.pageCount>this.pageCountFilter.max)
        return false;
    if(this.pageCountFilter.max&&this.pageCountFilter.min&&!book.pageCount) {
      return false;
    }
    return true;
  }

  private matchGenreFilter(book){
    if(this.genreFilter.length > 0) {
      for (let i = 0; i < this.genreFilter.length; i++)
        if (this.genreFilter[i] == book.genre)
          return true;
      return false;
    }
    else
      return true;
  }

  filteredBooks() {
    if(this.books.changed || this.filterChanged || !this._filteredBooks) {
      this.filterChanged = false;
      this._filteredBooks = [];
      for(let i = 0; i < this.books.length; i++){
        const book = this.books.all[i];
        if(
          this.matchTitleFilter(book)&&
          this.matchAuthorsFilter(book)&&
          this.matchLangsFilter(book)&&
          this.matchPageCountFilter(book)&&
          this.matchGenreFilter(book))
            this._filteredBooks.push(book);
      }
    }
    return this._filteredBooks;
  }

  // select data
  authorIdInFilter(authorId) {
    return this.authorsFilter.find(el => el == authorId);
  }

  langIdInFilter(langId){
    return this.langsFilter.find(el => el == langId);
  }

  genreInFilter(genre){
    return this.genreFilter.find(el => el == genre);
  }



  // Reset filters
  resetTitleFilter(){
    this.titleFilter = '';
    this.filterChanged = true;
  }

  resetAuthorsFilter(){
    this.authorsFilter = [];
    this.filterChanged = true;
  }

  resetLangsFilter(){
    this.langsFilter = [];
    this.filterChanged = true;
  }

  resetPageCountFilter(){
    this.pageCountFilter.min = undefined;
    this.pageCountFilter.max = undefined;
    this.filterChanged = true;
  }

  resetGenreFilter(){
    this.genreFilter = [];
    this.filterChanged = true;
  }

  constructor(public data: DataService, public books: BookService, public langs: LangsService, public authors: AuthorsService) {}

  ngOnInit() {
  }

}
