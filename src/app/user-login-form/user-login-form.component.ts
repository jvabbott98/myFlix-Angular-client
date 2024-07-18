import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  user: any;

  @Input() userData = { username: '', password: ''};

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
  // Logic for a successful user login goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies'])
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });

    this.fetchApiData.getUser(this.userData.username).subscribe((resp: any) => {
      this.user = resp;
      let user = {
        username: this.user.username,
        email: this.user.email,
        favoriteMovies: this.user.favoriteMovies
      }
      console.log(`localStorage user: `, user)
      localStorage.setItem("user", JSON.stringify(user));
    })

  }


  }
