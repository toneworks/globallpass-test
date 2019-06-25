import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../data.service';
import {AuthorsService} from '../../../../authors.service';

@Component({
  selector: 'app-new-author-modal',
  templateUrl: './new-author-modal.component.html',
  styleUrls: ['./new-author-modal.component.scss']
})
export class NewAuthorModalComponent implements OnInit {

  authorName = '';

  @Output() close = new EventEmitter();

  save() {
    this.authors.addOrUpdateAuthor(this.authorName);
    this.close.emit();
  }

  constructor(private authors: AuthorsService) { }

  ngOnInit() {
  }

}
