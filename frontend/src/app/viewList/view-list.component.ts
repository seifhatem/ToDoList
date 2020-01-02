import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})

export class ViewListComponent implements OnInit{



constructor(private http: HttpClient) { }

list = [];
newTaskTitle = "";

switchStatus(entryId){
  let body = new URLSearchParams();
  body.set('id', entryId);

  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

    this.http.post("http://localhost:3000/switch", body.toString(),options,{responseType: 'text'})
            .subscribe(data => {
                this.reloadList();
            }, error => {
                alert("Error updating status");
            });
}

onAddClick(){
if(this.newTaskTitle.length>1){
  alert("adding "+ this.newTaskTitle + "to the list");


let body = new URLSearchParams();
body.set('title', this.newTaskTitle);

let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

  this.http.post("http://localhost:3000/add", body.toString(),options,{responseType: 'text'})
          .subscribe(data => {
              this.reloadList();
          }, error => {
              alert("Error updating the list");
          });

}
}

reloadList(){
  this.http.get("http://localhost:3000/list").subscribe((res)=>{
              this.list = res;
          });
    }
    ngOnInit() {
    this.reloadList()
    }

  }
