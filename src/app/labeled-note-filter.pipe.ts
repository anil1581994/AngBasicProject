import { Pipe, PipeTransform } from '@angular/core';
import { NoteService } from './service/note.service';
import { Note } from './object/Note';


@Pipe({
  name: 'labeledNoteFilter'
})
export class LabeledNoteFilterPipe implements PipeTransform {

  transform(noteArray: Array<any>, labelId:number): any {
    debugger;
    if(!noteArray) return [];
    return noteArray.filter((noteObj)=>{
      if(noteObj.labels.length == 0)
        return false;
      return noteObj.labels.some((labelObj)=>{
        return labelObj.labelId == labelId;
      })
    })
    
  
}
}
