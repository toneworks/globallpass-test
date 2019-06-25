import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {AuthorsService} from '../../authors.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  addAuthor(){
    this.authors.addOrUpdateAuthor();
  }

  authorChanged(author, newValue){
    this.authors.addOrUpdateAuthor(newValue, author);
  }

  constructor(public authors: AuthorsService) { }

  ngOnInit() {
  }

}
