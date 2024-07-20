import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The DirectorInfoComponent displays information about a movie's director in a dialog.
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {
  /**
   * The movie details passed to the dialog.
   */
  movie: any;

  /**
   * The director details to be displayed.
   */
  director: any;

  /**
   * Constructor to inject dependencies.
   * @param dialogRef The reference to the dialog opened
   * @param snackBar The service to show notifications
   * @param data The data passed to the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's view has been fully initialized.
   */
  ngOnInit(): void {
    console.log(this.data);
  }
}

