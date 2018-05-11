import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';
import { ArchiveService } from '../archive/archive.service';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  notes:Note[];
  unArchiveImg="/assets/icons/unarchive.svg";
  pinIcon="/assets/icons/pin.svg";
  constructor(private archiveService:ArchiveService) { }

  ngOnInit() {
    this.archiveService.getAllNotes().subscribe(data=> {
  
      this.notes = data.body;
                  });
               
         }
         refreshNote():void{//getAllnotes
          this.archiveService.getAllNotes().subscribe(data=> {
            this.notes=data.body;
             });
        }
         unArchive(note):void{
          note.status=0;
          this.archiveService.updateNote(note).subscribe(data=>{
          console.log(data)
          this.refreshNote();
          }) ;
      }
      pinNote(note): void {
        console.log("pin note", note);
        note.status = 3;
        this.archiveService.updateNote(note).subscribe(response => {
          console.log("unArchive note", response);
          this.refreshNote();
        });
      };
    

}
