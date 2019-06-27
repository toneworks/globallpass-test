import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {BookService} from '../../book.service';
import {LangsService} from '../../langs.service';
import {AuthorsService} from '../../authors.service';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  private justInited = false;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private loadingDone = false;
  // tslint:disable-next-line:variable-name
  private _dataSource = new MatTableDataSource([]);
  public get dataSource() {
    if(this.books.changed || this.justInited) {
      this.justInited = false;
      this.loadingDone = true;
      this._dataSource.data = this.books.all;
      this._dataSource.paginator = this.paginator;
    }
    if(!this._dataSource.paginator && this.paginator)
      this._dataSource.paginator = this.paginator;
    return this._dataSource;
  }

  // tslint:disable-next-line:variable-name
  private _loading;
  public get loading() {
    if (this.loadingDone) {
      this.loadingDone = false;
      setTimeout(() => this.loading = false, 1);
    }
    return this._loading;
  }

  public set loading(value) {
    this._loading = value;
  }

  // tslint:disable-next-line:variable-name
  private _filterChanged = false;
  private get filterChanged() {
    const value = this._filterChanged;
    this._filterChanged = false;
    return value;
  }

  private set filterChanged(value){
    this.loading = true;
    this.books.getFilteredBooks({
      'title': this.titleFilter,
      'authors': this.authorsFilter,
      'langs': this.langsFilter,
      'pageCount': this.pageCountFilter,
      'genre': this.genreFilter
    });
    this._filterChanged = value;
  }

  displayedColumns = ['title', 'author', 'pageCount', 'lang', 'genre'];

  // tslint:disable-next-line:variable-name
  private titleFilter = '';

  private authorsFilter = [];

  private langsFilter = [];

  private pageCountFilter = {min: undefined, max: undefined};

  private genreFilter = [];

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

  constructor(public data: DataService, public books: BookService, public langs: LangsService, public authors: AuthorsService) {}

  ngOnInit() {
    this.justInited = true;
  }

  ngAfter
}
