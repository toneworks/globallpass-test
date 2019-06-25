import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainLayotComponent } from './main-layot/main-layot.component';
import { BooksListComponent } from './main-layot/books-list/books-list.component';
import { AuthorsListComponent } from './main-layot/authors-list/authors-list.component';
import { CardComponent } from './main-layot/books-list/card/card.component';
import { FieldComponent } from './main-layot/books-list/card/field/field.component';
import {FormsModule} from '@angular/forms';
import { NewLangModalComponent } from './main-layot/books-list/card/new-lang-modal/new-lang-modal.component';
import {NewAuthorModalComponent} from './main-layot/books-list/card/new-author-modal/new-author-modal.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'books-list', component:  BooksListComponent},
  { path: 'books-list/new', component: CardComponent },
  { path: 'books-list/:id', component: CardComponent },
  { path: 'authors-list', component: AuthorsListComponent },
  { path: '',
    redirectTo: '/books-list',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    MainLayotComponent,
    BooksListComponent,
    AuthorsListComponent,
    CardComponent,
    FieldComponent,
    NewLangModalComponent,
    NewAuthorModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
