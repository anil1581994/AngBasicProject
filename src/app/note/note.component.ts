import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Show';

  ngOnInit() {
    
  }
  
  constructor(private commonService:HttputilService) { }
  toggle() {
    console.log("toggle");
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  
}
