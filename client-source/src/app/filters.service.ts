import { Injectable } from '@angular/core';
import {BookService} from './book.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  public titleFilter = '';

  public authorsFilter = [];

  public langsFilter = [];

  public pageCountFilter = {min: undefined, max: undefined};

  public genreFilter = [];

  // tslint:disable-next-line:variable-name
  private _filterChanged = false;
  public get filterChanged() {
    const value = this._filterChanged;
    this._filterChanged = false;
    return value;
  }

  public set filterChanged(value){
    // this.loading = true;
    this.books.getFilteredBooks({
      'title': this.titleFilter,
      'authors': this.authorsFilter,
      'langs': this.langsFilter,
      'pageCount': this.pageCountFilter,
      'genre': this.genreFilter
    });
    this._filterChanged = value;
  }

  pageCountFilterChanged(extreme, value){
    this.filterChanged = true;
    if(!value) {
      this.pageCountFilter[extreme] = undefined;
      value = undefined;
    }
    if(extreme==='min'&&value>this.pageCountFilter.max)
      this.pageCountFilter.max = Number(value);
  }

  maxCountFilterAccept(value){
    if(!value)
      value = undefined;
    if(value<this.pageCountFilter.min)
      this.pageCountFilter.min = Number(value);
    this.filterChanged = true;
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

  resetPageCountFilter()  {
    this.pageCountFilter.min = undefined;
    this.pageCountFilter.max = undefined;
    this.filterChanged = true;
  }

  resetGenreFilter() {
    this.genreFilter = [];
    this.filterChanged = true;
  }

  constructor(private books: BookService) { }
}
