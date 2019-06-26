import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {AuthorsService} from '../../authors.service';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {
  displayedColumns = ['name'];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private onInit = false;
  // tslint:disable-next-line:variable-name
  private _dataSource = new MatTableDataSource([]);
  public get dataSource() {
    if(this.authors.changed||this.onInit) {
      this.onInit = false;
      this._dataSource.data = this.authors.all;
    }
    if(!this._dataSource.paginator)
      this._dataSource.paginator = this.paginator;
    return this._dataSource;
  }

  addAuthor() {
    this.authors.addOrUpdateAuthor();
  }

  authorChanged(author, newValue){
    this.authors.addOrUpdateAuthor(newValue, author);
  }

  constructor(public authors: AuthorsService) { }

  ngOnInit() {
    this.onInit = true;
  }

}
