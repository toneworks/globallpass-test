import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private onInit = false;
  // tslint:disable-next-line:variable-name
  private _dataSource = new MatTableDataSource([]);
  public get dataSource() {
    if(this.books.changed || this.filterChanged) {
      this._dataSource.data = this.filteredBooks;
      this._dataSource.paginator = this.paginator;
    }
    if(!this._dataSource.paginator && this.paginator)
      this._dataSource.paginator = this.paginator;
    return this._dataSource;
  }

  public get filteredBooks() {
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
    return this._filteredBooks;
  }

  // tslint:disable-next-line:variable-name
  private _filterChanged = false;
  private get filterChanged() {
    const value = this._filterChanged;
    this._filterChanged = false;
    return value;
  }

  private set filterChanged(value){
    this._filterChanged = value;
  }

  displayedColumns = ['title', 'author', 'pageCount', 'lang', 'genre'];

  // tslint:disable-next-line:variable-name
  private _filteredBooks;

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

  private matchTitleFilter(book) {
    if(this.titleFilter.length > 0)
      return book.title.search(this.titleFilter) > -1 || book.desc.search(this.titleFilter) > -1;
    else
      return true;
  }

  private matchAuthorsFilter(book){
    if(this.authorsFilter.length>0) {
      if (this.authorsFilter.find(author => author.id == book.authorId))
        return true;
      return false;
    }
    return true;
  }

  private matchLangsFilter(book) {
    if(this.langsFilter.length>0) {
      if (this.langsFilter.find(lang => lang.id == book.langId))
        return true;
      return false;
    }
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
    if((this.pageCountFilter.max!=undefined)&&(this.pageCountFilter.min!=undefined)&&!book.pageCount) {
      return false;
    }
    return true;
  }

  private matchGenreFilter(book){
    if(this.genreFilter.length>0) {
      if (this.genreFilter.find(genre => genre.name == book.genre))
        return true;
      return false;
    }
    return true;
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

  constructor(public data: DataService, public books: BookService, public langs: LangsService, public authors: AuthorsService,
              private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.filterChanged = true;
  }
}
