import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * The EditProfileDialogComponent provides a dialog for users to edit their profile information.
 */
@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  /**
   * Form group for editing the user profile.
   */
  editProfileForm: FormGroup;

  /**
   * Constructor to inject dependencies and initialize the form.
   * @param dialogRef The reference to the dialog opened
   * @param data The data passed to the dialog, including current user details
   * @param fb The FormBuilder service to create and manage forms
   * @param fetchApiData The service to fetch and update API data
   */
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private fetchApiData: FetchApiDataService
  ) {
    // Initialize the form with the data passed to the dialog
    this.editProfileForm = this.fb.group({
      username: [data.username, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required]
    });
  }

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's view has been fully initialized.
   */
  ngOnInit(): void {}

  /**
   * Saves the changes made to the profile.
   * If the form is valid, sends the updated user data to the API and closes the dialog.
   */
  saveChanges(): void {
    console.log('Form value: ', this.editProfileForm.value);
    if (this.editProfileForm.valid) {
      this.fetchApiData.updateUser(this.editProfileForm.value).subscribe((resp: any) => {
        this.dialogRef.close(resp);
      });
    }
  }

  /**
   * Closes the dialog without saving changes.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
