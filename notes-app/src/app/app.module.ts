import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotesComponentComponent } from './notes-component/notes-component.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SectionsComponentComponent } from './sections-component/sections-component.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page.not.found.component';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import {NotesServerService} from './services/notes-server.service';
import {CanDeactivateNote} from './can-deactivate-note';
import { UserFormComponent } from './user-form/user-form.component';

const appRoutes: Routes = [
  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: 'register', component: UserFormComponent},
  { path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]  },
  { path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotesComponentComponent,
    SectionsComponentComponent,
    PageNotFoundComponent,
    NotesEditorComponent,
    ViewSectionComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NotesServerService, CanDeactivateNote],
  bootstrap: [AppComponent]
})
export class AppModule { }
