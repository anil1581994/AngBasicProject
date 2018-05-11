import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { Note } from '../Note';
import {ReminderService}from '../reminder/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  model: any = {};
  //array to store note
  notes: Note[];
  archiveImg = "/assets/icons/archive.svg";
  pinIcon = "/assets/icons/pin.svg";
  unPinIcon = "/assets/icons/pinblue.svg";
  colorBoard = "/assets/icons/colorpalette.svg";
  reminderImg = "/assets/icons/remender.svg";
  clearImg = "/assets/icons/clear.svg";
  colors = [{
    color: '#f26f75',
    path: '/assets/icons/Red.png'
  }, {
    color: '#fcff77',
    path: '/assets/icons/lightyellow.png'
  }, {
    color: '#80ff80',
    path: '/assets/icons/green.png'
  }, {
    color: '#9ee0ff',
    path: '/assets/icons/blue.png'
  }, {
    color: '#9966ff',
    path: '/assets/icons/purple.png'
  }, {
    color: '#ff99cc',
    path: '/assets/icons/pink.png'
  }, {
    color: '#a52a2a',
    path: '/assets/icons/brown.png'
  }
  ];

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminderService.getAllNotes().subscribe(data => {
      this.notes = data.body;
    });
  }

  createNote(): void {
    console.log("formValue", this.model);
    this.reminderService.createNote( this.model)
      .subscribe(data => {
        console.log("note created", data);
        this.refreshNote();
      });

  }
  refreshNote(): void {
    this.reminderService.getAllNotes().subscribe(data => {
      this.notes = data.body;
    });
  }
  reminderSave(note, day) {

    if (day === 'Today') {
      var today = new Date();
      today.setHours(20);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    }
    else if (day === 'Tomorrow') {
      var today = new Date();
      today.setDate(today.getDate() + 1);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'Next week') {

      var today = new Date();
      today.setDate(today.getDate() + 6);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'null') {
      note.reminder = null;
    } else {
      var dateObj = this.model.reminder;
     
      var today = new Date(dateObj);

     

      note.reminder = today;
      this.refreshNote();

    }
    this.reminderService.updateNote(note).subscribe(response => {
      console.log("reminder  response", response);
      this.refreshNote();
    });

  }
  updateNoteColor(note, status): void {
    console.log("change note color", note, status);
    note.status = status;
    this.reminderService.updateNote(note).subscribe(data => {
      console.log("color  response", data);
      this.refreshNote();
    });
  };
  moveTrash(note): void {
    note.status = 1;
    this.reminderService.updateNote(note).subscribe(data => {
      console.log(data);
      this.refreshNote();
    });
  }
}
