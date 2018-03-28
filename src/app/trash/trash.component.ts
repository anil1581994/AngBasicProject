import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  notes:Note[];
  colors = [{
    color: '#f26f75',
    path: 'assets/icon/Red.png'
  }, {
    color: '#fcff77',
    path: 'assets/icon/lightyellow.png'
  }, {
    color: '#80ff80',
    path: '/assets/icon/green.png'
  }, {
    color: '#9ee0ff',
    path: '/assets/icon/blue.png'
  },  {
    color: '#9966ff',
    path: '/assets/icon/purple.png'
  }, {
    color: '#ff99cc',
    path: '/assets/icon/pink.png'
  }, {
    color: '#a52a2a',
    path: '/assets/icon/brown.png'
  }
  ];


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

  restore(note):void{
    note.status=0;
    this.commonService.putServiceData('note/updateNote',note).subscribe(data=>{
        console.log(data)
       this.refreshNote();
    }) ;
}

deleteForever(noteId):void{
  console.log(noteId);
  this.commonService.deleteServiceData('note/deleteNote',noteId).subscribe(data=>{this.notes=data.body;
    this.refreshNote();
 });

}


}
