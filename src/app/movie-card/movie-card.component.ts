import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog) { }

  isUpdatingFavorites = false;

  ngOnInit(): void {
    this.getUserAndMovies();
  }

  getUserAndMovies(): void {
    let test = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('GetUser: ', test)
  
    
      this.getMovies();
   
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  isFavorited(movieId: string): boolean {
    return this.user.favoriteMovies && this.user.favoriteMovies.includes(movieId);
  }

  showGenreDialog(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genreName: movie.genre.name,
        genreDescription: movie.genre.description
      },
      width: '500px',
    })
  }

  showDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        directorName: movie.director.name,
        directorDescription: movie.director.bio
      },
      width: '500px',
    })
  }

  showMovieSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        movieSynopsis: movie.description,
      },
      width: '500px',
    })
  }

  async toggleFavorite(movie: any): Promise<void> {
    if (this.isUpdatingFavorites) return;

    let user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log('User: ', user)
    console.log('this.user: ', this.user)
    console.log('Favorite Movies: ', user.favoriteMovies)
    console.log('movie _id: ', movie._id);
    if (user.favoriteMovies.includes(movie._id)) {
      await this.fetchApiData.removeFavoriteMovie(user.username, movie._id).toPromise();

      const serverUser = await this.fetchApiData.getUser(user.username).toPromise();
      this.user = {
        username: serverUser.username,
        email: serverUser.email,
        favoriteMovies: serverUser.favoriteMovies
      };
      localStorage.setItem("user", JSON.stringify(this.user));


      let updatedUser = JSON.parse(localStorage.getItem('user') || '');
      console.log('localStorage user: ', updatedUser)
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
      localStorage.setItem("user", JSON.stringify(this.user));


      let updatedUser = JSON.parse(localStorage.getItem('user') || '');
      console.log('localStorage user: ', updatedUser)
      this.isUpdatingFavorites = false;
    }
  }
}

