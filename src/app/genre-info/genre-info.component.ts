import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The GenreInfoComponent displays information about a movie's genre in a dialog.
 */
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent implements OnInit {
  /**
   * The genre details to be displayed.
   */
  genre: any;

  /**
   * The movie details from which the genre information is derived.
   */
  movie: any;

  /**
   * Constructor to inject dependencies.
   * @param dialogRef The reference to the dialog opened
   * @param snackBar The service to show notifications
   * @param data The data passed to the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
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
