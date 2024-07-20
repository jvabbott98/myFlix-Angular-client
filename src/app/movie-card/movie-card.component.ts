import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

/**
 * The MovieCardComponent displays movie cards with options to view details and manage favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to hold the list of movies.
   */
  movies: any[] = [];

  /**
   * Object to hold the current user's details.
   */
  user: any = {};

  /**
   * Flag to indicate if favorites are currently being updated.
   */
  isUpdatingFavorites = false;

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
    this.getUserAndMovies();
  }

  /**
   * Retrieves user information and the list of movies.
   */
  getUserAndMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('GetUser: ', user);
    this.getMovies();
  }

  /**
   * Retrieves all movies from the API and assigns them to the movies array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Checks if a movie is favorited by the user.
   * @param movieId The ID of the movie to check
   * @returns True if the movie is favorited, false otherwise
   */
  isFavorited(movieId: string): boolean {
    return this.user.favoriteMovies && this.user.favoriteMovies.includes(movieId);
  }

  /**
   * Opens a dialog to display genre information of the selected movie.
   * @param movie The movie whose genre information is to be displayed
   */
  showGenreDialog(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genreName: movie.genre.name,
        genreDescription: movie.genre.description
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog to display director information of the selected movie.
   * @param movie The movie whose director information is to be displayed
   */
  showDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        directorName: movie.director.name,
        directorDescription: movie.director.bio
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog to display the synopsis of the selected movie.
   * @param movie The movie whose synopsis is to be displayed
   */
  showMovieSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        movieSynopsis: movie.description,
      },
      width: '500px',
    });
  }

  /**
   * Toggles the favorite status of a movie for the user.
   * Updates the user's favorite movies list and local storage accordingly.
   * @param movie The movie to be added or removed from favorites
   */
  async toggleFavorite(movie: any): Promise<void> {
    if (this.isUpdatingFavorites) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User: ', user);
    console.log('this.user: ', this.user);
    console.log('Favorite Movies: ', user.favoriteMovies);
    console.log('movie _id: ', movie._id);

    if (user.favoriteMovies.includes(movie._id)) {
      await this.fetchApiData.removeFavoriteMovie(user.username, movie._id).toPromise();

      const serverUser = await this.fetchApiData.getUser(user.username).toPromise();
      this.user = {
        username: serverUser.username,
        email: serverUser.email,
        favoriteMovies: serverUser.favoriteMovies
      };
      localStorage.setItem('user', JSON.stringify(this.user));

      const updatedUser = JSON.parse(localStorage.getItem('user') || '');
      console.log('localStorage user: ', updatedUser);
      this.isUpdatingFavorites = false;
      return;
    } else {
      this.isUpdatingFavorites = true;
      await this.fetchApiData.addFavoriteMovie(user.username, movie._id).toPromise();

      const serverUser = await this.fetchApiData.getUser(user.username).toPromise();
      this.user = {
        username: serverUser.username,
        email: serverUser.email,
        favoriteMovies: serverUser.favoriteMovies
      };
      localStorage.setItem('user', JSON.stringify(this.user));

      const updatedUser = JSON.parse(localStorage.getItem('user') || '');
      console.log('localStorage user: ', updatedUser);
      this.isUpdatingFavorites = false;
    }
  }
}


