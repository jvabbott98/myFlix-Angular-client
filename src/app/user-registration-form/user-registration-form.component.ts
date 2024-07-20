import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationFormComponent is used to register a new user.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input property to bind form data.
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Constructor to inject dependencies.
   * @param fetchApiData The service to fetch API data
   * @param dialogRef The reference to the dialog opened
   * @param snackBar The service to show notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's view has been fully initialized.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the form inputs to the backend.
   */
  registerUser(): void {
    console.log('User Data:', this.userData);
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Registration successful', result);
        this.dialogRef.close();
        this.snackBar.open('Registration successful', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error during registration:', error);
        this.snackBar.open('Registration failed: ' + error.message, 'OK', {
          duration: 2000
        });
      }
    });
  }
}
