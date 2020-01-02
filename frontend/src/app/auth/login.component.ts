import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  constructor(private http: HttpClient,private router: Router) { }

  username = "";
  password = "";

  authenticate(){

    let body = new URLSearchParams();
    body.set('username', this.username);
    body.set('password', this.password);

    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

      this.http.post("https://dry-eyrie-27465.herokuapp.com/login", body.toString(),options)
              .subscribe(data => {
                  this.router.navigateByUrl("/");
              }, error => {
                  alert(error.statusText);
              });
  }

}
