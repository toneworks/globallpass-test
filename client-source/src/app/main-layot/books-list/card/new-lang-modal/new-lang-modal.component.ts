import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../data.service';

@Component({
  selector: 'app-new-lang-modal',
  templateUrl: './new-lang-modal.component.html',
  styleUrls: ['./new-lang-modal.component.scss']
})
export class NewLangModalComponent implements OnInit {

  lang = '';

  @Output() close = new EventEmitter();

  save(){
    this.data.addLang(this.lang);
    this.close.emit();
  }

  constructor(private data: DataService) { }

  ngOnInit() {
  }

}
