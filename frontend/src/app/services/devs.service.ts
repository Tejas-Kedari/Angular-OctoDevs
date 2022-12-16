import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevsService {

  constructor(private http:HttpClient) { }

  // connect fronend to backend
  apiUrl = 'http://localhost:3000/';

  // get all data
  getAllData():Observable<any>
  {
    return this.http.get(`${this.apiUrl}`);
  }

  // Creating Data
  createData(data:any):Observable<any>
  {
    data.id = Math.floor(Math.random() * 100000);
    return this.http.post(`${this.apiUrl}`, data)
  }

  // Deleting Data
  deleteData(id:any):Observable<any>
  { 
    let ids = id;
    return this.http.delete(`${this.apiUrl}${ids}`);
  }

  // update data
  updateData(data:any, id:any):Observable<any>
  {
    let ids = id;
    return this.http.put(`${this.apiUrl}${ids}`, data)
  }

  // getsingle data
  getSingleData(id:any):Observable<any>
  {
    let ids = id;
    return this.http.get(`${this.apiUrl}${ids}`)
  }
}
