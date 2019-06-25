import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../data.service';
import {LangsService} from '../../../../langs.service';

@Component({
  selector: 'app-new-lang-modal',
  templateUrl: './new-lang-modal.component.html',
  styleUrls: ['./new-lang-modal.component.scss']
})
export class NewLangModalComponent implements OnInit {

  lang = '';

  @Output() close = new EventEmitter();

  save() {
    this.langs.addLang(this.lang);
    this.close.emit();
  }

  constructor(private langs: LangsService) { }

  ngOnInit() {
  }

}
