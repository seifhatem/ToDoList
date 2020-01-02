import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})

export class ViewListComponent implements OnInit{



constructor(private http: HttpClient,private router: Router) { }

list = [];
newTaskTitle = "";

switchStatus(entryId){
  let body = new URLSearchParams();
  body.set('id', entryId);

  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

    this.http.post("https://dry-eyrie-27465.herokuapp.com/switch", body.toString(),options)
            .subscribe(data => {
                this.reloadList();
            }, error => {
                alert("Error updating status");
            });
}

onAddClick(){
if(this.newTaskTitle.length>1){


let body = new URLSearchParams();
body.set('title', this.newTaskTitle);

let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

  this.http.post("https://dry-eyrie-27465.herokuapp.com/add", body.toString(),options)
          .subscribe(data => {
              this.reloadList();
          }, error => {
              alert("Error updating the list");
          });

}
this.newTaskTitle ="";
}

reloadList(){
  this.http.get<any>("https://dry-eyrie-27465.herokuapp.com/list").subscribe((res)=>{
              this.list = res;
            }, error => {
                this.router.navigateByUrl("/login");
            });
    }
    ngOnInit() {
    this.reloadList()
    }

  }
