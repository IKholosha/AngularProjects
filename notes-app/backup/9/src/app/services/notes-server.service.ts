import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../notes-component/notes-component.component';

@Injectable()
export class NotesServerService {
  private notesUrl = 'notes'; // URL to web api
  constructor(private http: HttpClient) {}

  getNotes(section): Observable<Note[]> {

    const params = new HttpParams()
      .set('section', section);
    return this.http.get<Note[]>(this.notesUrl, {params: params});

  }

}
