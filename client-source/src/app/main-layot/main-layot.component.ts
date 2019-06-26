import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layot',
  templateUrl: './main-layot.component.html',
  styleUrls: ['./main-layot.component.scss']
})
export class MainLayotComponent implements OnInit {

  tabId = 'books';

  setTabId(tabId) {
    this.tabId = tabId;
  }

  constructor() { }

  ngOnInit() {
  }

}