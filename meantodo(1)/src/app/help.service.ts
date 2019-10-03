import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HelpService {
  dataList =[];
  constructor(public http: HttpClient) {
    
  }

  showData(){
    return this.http.get('http://localhost:3000/final')
  }

  addFood(food){
    return this.http.post('http://localhost:3000/addfood', {food})
    .subscribe(
      // console.log()
    )

  }


  deleteFood(id){
    console.log('Service delete: ' + id)
    var url = 'http://localhost:3000/deletefood/' + id
    console.log('URL: ' + url)
    return this.http.delete(url)
    .subscribe(

    )
  }

  
}
