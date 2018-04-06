import { ViewChild, ElementRef, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttputilService } from '../httputil.service';
import { Label } from '../Label';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  model: any = {};//get form data by 2way Binding
  labels: Label[];
  contentId: String;

  clearImg = "/assets/icons/clear.svg";
  plusImg = "/assets/icons/createlabel.svg";
  checkImg = "/assets/icons/checkmark.png";




  constructor(@Inject(MAT_DIALOG_DATA) private data: Label,
    private commonService: HttputilService, public dialogRef: MatDialogRef<LabelComponent>) { }

  ngOnInit() {
    this.getAllLabels();
  }



  createLabel(): void {
    console.log("formValue", this.model);
    this.commonService.postServiceData('note/createlabel', this.model)
      .subscribe(data => {
        console.log("label created", data);
        this.dialogRef.close();
        // this.getAllLabels();

      });
  }
  getAllLabels(): void {
    this.commonService.getLabelService('note/getAllLabels').subscribe(response => {
      this.labels = response.body;
    });
  }

  deleteLabel(contentId): void {
    console.log(contentId);
    this.commonService.deleteServiceData('note/deleteLabel', contentId).subscribe(data => {
    this.labels = data.body;
      this.getAllLabels();
    });

  }
  updateLabel(): void {
    console.log("formValue", this.data);
    this.commonService.putServiceData('note/updateLabel', this.data)
      .subscribe(data => {
        console.log(data);
        this.getAllLabels();
        this.dialogRef.close();
      });
  }

}
