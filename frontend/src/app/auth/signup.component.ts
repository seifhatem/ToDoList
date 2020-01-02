import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{

    constructor(private http: HttpClient,private router: Router) { }
    
  username = "";
  password = "";
  password2 ="";
signup(){
  let body = new URLSearchParams();
  body.set('username', this.username);
  body.set('password', this.password);
  body.set('passwordconf', this.password2);

  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

    this.http.post("http://localhost:3000/signup", body.toString(),options)
            .subscribe(data => {
                this.router.navigateByUrl("/login");
            }, error => {
                alert(error.statusText);
            });

}
}
