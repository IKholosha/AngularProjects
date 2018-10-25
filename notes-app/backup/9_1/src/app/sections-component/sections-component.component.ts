import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, } from 'rxjs';
import { HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-sections-component',
  templateUrl: './sections-component.component.html',
  styleUrls: ['./sections-component.component.css']
})
export class SectionsComponentComponent implements OnInit {

  private sectionsUrl = 'http://localhost:8080/sections';

  sections: Section[];
  activeSection = '';

  @Output()
  sectionChanged: EventEmitter<string> =
    new EventEmitter<string>();


  constructor(private http: HttpClient) {
  }

  @Input()
  set section(section:string) {

    console.log('--> sections#setSection ' + section);

    if (section && section.length>0) {
      this.activeSection = section;
    }
  }

  ngOnInit() {
    this.readSections();

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

  }

  showSection(section: Section)
  {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }

  addSection(newSection: HTMLInputElement)
  {
    let title: string = newSection.value;

    if (this.sections.map(s => s.title).find(t => t === title))
    {
      return;
    }

    const section: Section = {title};
    this.sections.unshift(section);
    this.showSection(section);

    this.writeSections().subscribe(res => newSection.value = "");
  }

  writeSections()
  {
    return this.http.post(this.sectionsUrl + '/replace', this.sections);
  }
}


interface Section {
  _id?: string;
  title: string;
}
