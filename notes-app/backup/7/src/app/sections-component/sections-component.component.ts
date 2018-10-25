import { Component, OnInit } from '@angular/core';
import {Observable, } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sections-component',
  templateUrl: './sections-component.component.html',
  styleUrls: ['./sections-component.component.css']
})
export class SectionsComponentComponent implements OnInit {

  private sectionsUrl = 'sections';

  //sections: Section[];
  sections = [{title: "Work"}, {title: "Private"}];
  activeSection = "";

  constructor(private http: HttpClient) {
    this.readSections();
  }

  ngOnInit() {
  }

  readSections() {
    this.getSections().subscribe(sections=>{
      this.sections= sections;
      if (this.activeSection == null && this.sections.length>0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  getSections(): Observable<Section[]>
  {
    return this.http.get<Section[]>(this.sectionsUrl);
    //return this.http.get(this.sectionsUrl)
    //  .map(response => response.json() as Section[]);
  }

  showSection(section:Section) {
    this.activeSection = section.title;
  }

}


interface Section {
  _id?: string;
  title: string;
}
