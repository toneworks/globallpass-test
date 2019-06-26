import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../data.service';
import {Book} from '../../../book';
import {AuthorsService} from '../../../authors.service';
import {LangsService} from '../../../langs.service';
import {BookService} from '../../../book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  test(value){
    console.log(value);
  }

  title;
  desc;
  authorId;
  pageCount;
  langId;
  genre;

  author;
  lang;

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
    this.books.addOrUpdateBook(this.book, this.title, this.author.id, this.desc, this.pageCount, this.lang.id, this.genre);
    this.close.emit();
  }

  constructor(public authors: AuthorsService, public langs: LangsService, private books: BookService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const init = () => {
      this.book = this.books.byId(this.route.snapshot.paramMap.get('id'));
      if (this.book) {
        this.isNew = false;
        this.title = this.book.title;
        this.authorId = this.book.authorId;
        this.desc = this.book.desc;
        this.pageCount = this.book.pageCount;
        this.langId = this.book.langId;
        this.genre = this.book.genre;

        if(this.authors.loaded)
          this.author = this.authors.all.find(author => author.id == this.authorId);
        else
          this.authors.justLoaded.subscribe(() => {
            this.author = this.authors.all.find(author => author.id == this.authorId);
          });

        if(this.langs.loaded) {
          this.lang = this.langs.all.find(lang => lang.id == this.langId);
        }
        else {
          this.langs.justLoaded.subscribe(() => {
            this.lang = this.langs.all.find(lang => lang.id == this.langId);
          });
        }
      } else {
        this.isNew = true;

        if (this.authors.length > 0)
          this.authorId = this.authors.all[0].id;
        else
          this.authors.justAdded.subscribe(author => this.authorId = author.id);

        if (this.langs.length > 0)
          this.langId = this.langs.all[0].id;
        else
          this.langs.justAdded.subscribe(lang => this.langId = lang.id);
      }
    }

    if(this.books.loaded) {
      init();
    }
    else
      this.books.justLoaded.subscribe(() => {
        init();
      });
  }
}
