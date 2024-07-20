import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The MovieSynopsisComponent displays the movie synopsis in a dialog.
 */
@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent implements OnInit {
  /**
   * The genre of the movie.
   */
  genre: any;

  /**
   * The movie details.
   */
  movie: any;

  /**
   * Constructor to inject dependencies.
   * @param dialogRef The reference to the dialog opened
   * @param snackBar The service to show notifications
   * @param data The data passed to the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
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

