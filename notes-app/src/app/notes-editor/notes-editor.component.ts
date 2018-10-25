import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotesComponentComponent} from "../notes-component/notes-component.component";

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.css']
})
export class NotesEditorComponent implements OnInit {

  @ViewChild(NotesComponentComponent)
  notesComponent: NotesComponentComponent;

  section: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap
      .subscribe(params => this.section = params['name']);
  }

  ngOnInit() {
  }

  setSection(section:string) {
    //this.section = section;
    this.router.navigate([section]);
  }

}
