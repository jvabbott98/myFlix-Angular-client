import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

/**
 * The UserProfileComponent displays the user's profile information and allows editing.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * The user object containing user details.
   */
  user: any = {};

  /**
   * Constructor to inject dependencies.
   * @param fetchApiData The service to fetch API data
   * @param dialog The MatDialog instance for opening dialogs
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's view has been fully initialized.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves the user details from the backend.
   */
  getUser(): void {
    this.fetchApiData.getUser(JSON.parse(localStorage.getItem('user') || '{}').username).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  /**
   * Opens the dialog to edit the user's profile information.
   */
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { username: this.user.username, email: this.user.email, birthday: this.user.birthday }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }
}
