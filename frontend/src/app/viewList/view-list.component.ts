import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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

ngOnInit() {
this.http.get("http://localhost:3000/list").subscribe((res)=>{
            this.list = res;
            console.log(this.list);
        });
  }
}
