import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The UserLoginFormComponent is used to log in an existing user.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * The user object containing user details.
   */
  user: any;

  /**
   * Input property to bind form data.
   */
  @Input() userData = { username: '', password: '' };

  /**
   * Constructor to inject dependencies.
   * @param fetchApiData The service to fetch API data
   * @param dialogRef The reference to the dialog opened
   * @param snackBar The service to show notifications
   * @param router The router instance for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's view has been fully initialized.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by sending the form inputs to the backend.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    });

    this.fetchApiData.getUser(this.userData.username).subscribe((resp: any) => {
      this.user = resp;
      const user = {
        username: this.user.username,
        email: this.user.email,
        favoriteMovies: this.user.favoriteMovies
      };
      console.log(`localStorage user: `, user);
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
