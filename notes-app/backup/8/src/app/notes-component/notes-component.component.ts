import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {NotesServerService} from '../services/notes-server.service';

@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.css']
})
export class NotesComponentComponent implements OnInit, OnChanges {

  private notesUrl = 'http://localhost:8080/notes';

  notes: Note[] = [];

  text: string;

  @Input()
  section: string;


  constructor(private http: HttpClient, private notesServer: NotesServerService) {}

  ngOnInit() {

  }

  ngOnChanges()
  {
    this.getNotes().subscribe(data=> this.notes= data);
  }

  getNotes(): Observable<Note[]> {

    const params = new HttpParams()
      .set('section', this.section);
    return this.http.get<Note[]>(this.notesUrl, {params: params});

  }

  add() {
    let note = { text: this.text, section: this.section };
    this.notes.push(note);
    this.text = "";
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

}

export interface Note {
  text: string;
  section: string;
}
