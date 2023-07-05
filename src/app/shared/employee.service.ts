import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Employee } from './employee';
import {environment} from 'src/environments/environment'
import { Observable } from 'rxjs';
import{Department} from'./department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees:Employee[];
  formData:Employee=new Employee();
  departments:Department[];
  constructor(private httpClient:HttpClient ) { }
  //for listining employess
  BindListEmployees(){
    this.httpClient.get(environment.apiUrl+"/api/employees")
    .toPromise().then(response => this.employees=response as Employee[])
  }
  
  //for insert employee
  insertEmployee(emp:Employee):Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+"/api/employees",emp)
  }
  //get a particular employee
  getEmployee(empId:number):Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/employees/"+empId)
  }

  //update employee
  UpdateEmployee(emp:Employee):Observable<any>
  {
      return this.httpClient.put(environment.apiUrl+"/api/employees",emp);
  }
  //delete employee
  deleteEmployee(id:number){
    return this.httpClient.delete(environment.apiUrl+"/api/employees/"+id);
  }
  
  //get department
  BindDepartments(){
    this.httpClient.get(environment.apiUrl+"/api/images").toPromise()
    .then(response=>this.departments=response as Department[])

  }

}
