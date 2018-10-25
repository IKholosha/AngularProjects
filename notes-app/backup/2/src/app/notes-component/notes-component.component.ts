import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.css']
})
export class NotesComponentComponent implements OnInit {

  private notesUrl = 'http://localhost:8080/notes';

  notes: Note[] = [
    {text:"Note one"},
    {text:"Note two"}
  ];

  text: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  add() {
    let note = { text: this.text }
    this.notes.push(note);
    this.text = "";
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

}

interface Note {
  text: string;
}
