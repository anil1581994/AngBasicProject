import { Label } from "./Label";

export class Note {
        noteId:number;
         title:String
	   description:String
         createDate:Date
         lastUpdateDate:Date
         status:number
        color:String
        reminder:Date
        labels:Label[]
}