import { Label } from "./Label";
import {Collaborator}from "./Collaborator";

export class Note {
        noteId:number;
        title:string
        description:string
        createDate:Date
        lastUpdateDate:Date
        status:number
        color:string
        reminder:Date
        labels:Label[]
        collaboratorName:string
        ownerId:number
        sharedUserId:string
        collaborators:Collaborator[]
}