import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

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

  //notes: Note[] = [];

  text: string;
  section = "Work";


  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
    //let params: URLSearchParams = new URLSearchParams();
    //params.set('section', this.section);
    //return this.http.get(this.notesUrl, {search:params})
    //  .map(response => response.json() as Note[]);
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

interface Note {
  text: string;
}
