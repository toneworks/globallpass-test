import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  addAuthor(){
    this.data.addAuthor();
  }

  authorChanged(author, newValue){
    this.data.authorChanged(author, newValue);
  }

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
