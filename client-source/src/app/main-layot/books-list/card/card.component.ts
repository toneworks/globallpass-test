import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../data.service';
import {Book} from '../../../book';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  title;
  desc;
  authorId;
  pageCount;
  langId;
  genre;

  isNew = true;

  newLangModal = false;

  newAuthorModal = false;

  @Output() close = new EventEmitter();

  @Input() book: Book;

  titleChanged(newTitle){
    this.title = newTitle;
    this.isNew = false;
  }

  descChanged(newDesc){
    this.desc = newDesc;
  }

  authorChanged(newId) {
    this.authorId = newId;
  }

  pageCountChanged(event) {
    const max = 1000000;
    event.target.value = event.target.value.replace(/[^0-9]/, '');
    if (event.target.value > max)
      event.target.value = max;
    this.pageCount = event.target.value;
  }

  langChanged(newId) {
    this.langId = newId;
  }

  genreChanged(newGenre) {
    this.genre = newGenre;
  }

  save() {
    this.data.addOrUpdateBook(this.book, this.title, this.authorId, this.desc, this.pageCount, this.langId, this.genre);
    this.close.emit();
  }

  newLang(lang){
    console.log(this.data.langs.length);
    this.newLangModal = false;
  }

  constructor(public data: DataService) {
  }

  ngOnInit() {
    if(this.book) {
      this.isNew = false;
      this.title = this.book.title;
      this.authorId = this.book.authorId;
      this.desc = this.book.desc;
      this.pageCount = this.book.pageCount;
      this.langId = this.book.langId;
      this.genre = this.book.genre;
    }
    else {
      this.isNew = true;
      if(this.data.authors.length>0)
        this.authorId = this.data.authors[0].id;
      if(this.data.langs.length>0)
        this.langId = this.data.langs[0].id;
    }
  }
}
