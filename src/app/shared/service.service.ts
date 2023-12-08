import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  //create Data
  addEmployee(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/employees", data)
  }
   //Update Data
   updateEmployee(id:number ,data:any):Observable<any> {
    return this.http.put(`http://localhost:3000/employees/${id}`,data)
  }

  //Get Data
  getAllEmployee(): Observable<any> {
    return this.http.get("http://localhost:3000/employees")
  }
  //Deleete Data
  deleteEmployee(id:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`)
  }
}
