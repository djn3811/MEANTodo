import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HelpService } from '../help.service'
import { AppComponent } from '../app.component'



// import express to get the data so it can be displayed on the webpage

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  dataList ; 


  constructor(private http: HttpClient, public help: HelpService) { 
    this.dataList = ['temp']
   
    
  }

  ngOnInit() {
     this.getData()
  
  }

 

  getData(){
    this.help.showData()
    .subscribe(record => {
      this.dataList = record;
      // console.log('getData(): ' + this.dataList)
    })
  }

  addFood(food){ 
    // this.help.addFood(food, total)
    this.help.addFood(food)
  }

  delete(id){
    console.log('Show delete: ' + id)
    this.help.deleteFood(id)
  }

  


}
