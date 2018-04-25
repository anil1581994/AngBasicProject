import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilter implements PipeTransform {


  transform(noteArray: Array<any>, args?: any): any {
    if(!noteArray) return [];
    
    return noteArray.filter((noteObj) => {
      if (args) 
      {
        var flag = true;
        for (var index in args) //for each
        {
          if (noteObj[index] != args[index]) 
           {
            flag = false;
            break;
           }
        }
        return flag;
      }
      return noteObj.status == 0
    });
  }


}
