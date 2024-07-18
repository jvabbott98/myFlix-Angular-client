import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://justinsmoviedb-6d40ef42c02f.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(apiUrl + 'users', userDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(apiUrl + 'login', userDetails, { headers }).pipe(map((response: any) => {
      const token = response.token;
      localStorage.setItem('token', token);
      return response;
    }),
      catchError(this.handleError)
    );
  }

  public getUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userData}`,  {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }


  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

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



  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    return this.http.put(apiUrl + `users/${username}`, userData, { headers })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }






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
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};

  }

}

