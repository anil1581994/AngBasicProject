import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  notes:Note[];
  constructor(private commonService:HttputilService) { }

  ngOnInit() {
    this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
  
      this.notes = data.body;
                  });
         }
         refreshNote():void{//getAllnotes
          this.commonService.getServiceData('note/getAllNotes').subscribe(data=> {
            this.notes=data.body;
             });
        }
         resunArchive(note):void{
          note.status=0;
          this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
              console.log(data)
             this.refreshNote();
          }) ;
      }
}
