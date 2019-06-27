import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {BookService} from '../../book.service';
import {LangsService} from '../../langs.service';
import {AuthorsService} from '../../authors.service';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {FiltersService} from '../../filters.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  private justInited = false;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // tslint:disable-next-line:variable-name
  private _dataSource = new MatTableDataSource([]);
  public get dataSource() {
    if(this.books.changed || this.justInited) {
      this.justInited = false;
      this._dataSource.data = this.books.all;
      this._dataSource.paginator = this.paginator;
    }
    if(!this._dataSource.paginator && this.paginator)
      this._dataSource.paginator = this.paginator;
    return this._dataSource;
  }

  displayedColumns = ['title', 'author', 'pageCount', 'lang', 'genre'];

  constructor(public data: DataService, public books: BookService, public langs: LangsService, public authors: AuthorsService,
              public filters: FiltersService) {}

  ngOnInit() {
    this.justInited = true;
  }

}
