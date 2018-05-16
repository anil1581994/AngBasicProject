import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../../service/httputil.service';
import { Note } from '../../object/Note';
// import { ArchiveService } from '../../service/archive.service';
import { NoteService } from '../../service/note.service';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  notes:Note[];
  unArchiveImg="/assets/icons/unarchive.svg";
  pinIcon="/assets/icons/pin.svg";
  marginTop : string;
  flexSize : string;
  constructor(private archiveService:NoteService) { }

  ngOnInit() {
    this.archiveService.getAllNotes().subscribe(data=> {
      this.notes = data.body;
   });
   this.changeGridCss();
  }
  changeGridCss() {
    this.archiveService.getStatus().subscribe((status) => {
      this.marginTop = status ? "10px" : "0px";
      this.flexSize = status ? "100%" : "30%";
    });
  }
  // unArchive(note):void{
  //   note.status=0;
  //   this.archiveService.putServiceData('note/updateNote',note).subscribe(data=>{
  //       console.log(data)
  //      this.refreshNote();
  //   }) ;
//}

}
