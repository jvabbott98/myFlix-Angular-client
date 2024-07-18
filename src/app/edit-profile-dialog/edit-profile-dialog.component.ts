import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  editProfileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private fetchApiData: FetchApiDataService
  ) {
    this.editProfileForm = this.fb.group({
      username: [data.username, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required]
    });
  }

  ngOnInit(): void {}

  saveChanges(): void {
    console.log('Form value: ', this.editProfileForm.value);
    if (this.editProfileForm.valid) {
      this.fetchApiData.updateUser(this.editProfileForm.value).subscribe((resp: any) => {
        this.dialogRef.close(resp);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
