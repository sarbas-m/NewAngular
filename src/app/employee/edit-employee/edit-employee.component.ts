import { DatePipe } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/employee';
import {EmployeeService} from 'src/app/shared/employee.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  //declare variable
  empId:number;
  employee:Employee=new Employee();
  constructor(private employeeService:EmployeeService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    //getting the id passed from the browser Url
    this.empId=this.route.snapshot.params['empId']
    //snapshot to take id from url
    this.employeeService.getEmployee(this.empId).subscribe
    (data=>{
      console.log(data)
      this.employee=data;
//changing the date format
var datePipe=new DatePipe("en-UK");
let formatedyear:any=datePipe.transform(data.dateOfJoining,'yyyy-MM-dd');
data.dateOfJoining=formatedyear;
this.employeeService.formData=Object.assign({},data);



    },error=>console.log(error))
  }
  
  

}
