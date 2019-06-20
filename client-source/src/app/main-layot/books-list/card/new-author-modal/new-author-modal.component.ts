import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../data.service';

@Component({
  selector: 'app-new-author-modal',
  templateUrl: './new-author-modal.component.html',
  styleUrls: ['./new-author-modal.component.scss']
})
export class NewAuthorModalComponent implements OnInit {

  author = '';

  @Output() close = new EventEmitter();

  save(){
    this.data.addAuthor(this.author);
    this.close.emit();
  }

  constructor(private data: DataService) { }

  ngOnInit() {
  }

}
