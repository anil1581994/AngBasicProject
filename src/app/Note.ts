import { Label } from "./Label";
import {Collaborator}from "./Collaborator";
import {UrlData} from "./UrlData";
import { Observable } from "rxjs";
export class Note {
        noteId:number;
        title:string
        description:string
        createDate:Date
        lastUpdateDate:Date
        status:number//
        color:string
        reminder:Date
        labels:Label[]
        collaboratorName:string
        ownerId:number
        sharedUserId:string
        collaborators:Collaborator[]
        Urls:UrlData[]
        urlPromise ?: Observable<any>
        //imageUrl:string
        image:string
}
