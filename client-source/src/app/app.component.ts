import { Component } from '@angular/core';
import {RequestService} from './request.service';
import {BookService} from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'globallpass-test';

  constructor(private request: RequestService, private books: BookService) {
  }
}
