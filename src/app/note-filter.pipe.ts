import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilter implements PipeTransform {

   statusNumber:number
  transform(noteArray: Array<any>, args?: any): any{ //option =0=>unpinNote, 3=pinNote
    if(!noteArray) return [];
    
    return noteArray.filter((noteObj) => {
      if (args) 
      {
        var flag = true;
        for (var index in args) //for each
        {
          if (noteObj[index]!= args[index]) 
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

