import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-month-dialog',
  templateUrl: './month-dialog.component.html',
  styleUrls: ['./month-dialog.component.css']
})
export class MonthDialogComponent {
  constructor(
    public dialogRef:  MatBottomSheetRef<MonthDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {}

  
}
