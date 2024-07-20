import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://justinsmoviedb-6d40ef42c02f.herokuapp.com/';

/**
 * Service to fetch data from the API.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via `this.http`.
   * @param http The HttpClient instance
   */
  constructor(private http: HttpClient) {}

  /**
   * Register a new user.
   * @param userDetails The details of the user to register
   * @returns An Observable containing the server's response
   */
  public userRegistration(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(apiUrl + 'users', userDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log in an existing user.
   * @param userDetails The details of the user to log in
   * @returns An Observable containing the server's response
   */
  public userLogin(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(apiUrl + 'login', userDetails, { headers }).pipe(
      map((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get the details of a specific user.
   * @param userData The username of the user to retrieve
   * @returns An Observable containing the user's data
   */
  public getUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userData}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get the list of all movies.
   * @returns An Observable containing the list of movies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to the user's list of favorite movies.
   * @param username The username of the user
   * @param movieID The ID of the movie to add
   * @returns An Observable containing the server's response
   */
  public addFavoriteMovie(username: any, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, {}, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Remove a movie from the user's list of favorite movies.
   * @param username The username of the user
   * @param movieID The ID of the movie to remove
   * @returns An Observable containing the server's response
   */
  public removeFavoriteMovie(username: any, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Update the details of a specific user.
   * @param userData The updated user data
   * @returns An Observable containing the server's response
   */
  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    return this.http.put(apiUrl + `users/${username}`, userData, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP operation failures.
   * @param error The error response object
   * @returns An Observable with a user-facing error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Extract the data from the HTTP response.
   * @param res The HTTP response
   * @returns The body of the response, or an empty object if no body is present
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
