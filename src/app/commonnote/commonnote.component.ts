import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';

@Component({
  selector: 'app-commonnote',
  templateUrl: './commonnote.component.html',
  styleUrls: ['./commonnote.component.css']
})
export class CommonnoteComponent implements OnInit {
  notes:Note[];
  archiveImg="/assets/icons/archive.svg";

  constructor(private commonService:HttputilService) { }

  ngOnInit() {
    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
  
      this.notes = data.body;
                  });
  }
   
}
