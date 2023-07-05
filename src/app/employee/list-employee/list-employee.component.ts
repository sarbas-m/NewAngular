import { Component, OnInit } from '@angular/core';
import {EmployeeService} from 'src/app/shared/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  page:number=1;
  filter:number;
 
  constructor(public employeeService:EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.employeeService.BindListEmployees();
  }
  //Update Employee--passing the id through URL
  updateEmployee(empId:number){
    console.log(empId)
    this.router.navigate(['editemployee',empId]);
  }

  DeleteEmployee(id:number){
    if(confirm('Are you sure to delete this record?')){
      this.employeeService.deleteEmployee(id).subscribe(
        response=>{
          this.employeeService.BindListEmployees();
          alert("Deleted Succesfully")
        },err=>{
          console.log(err)
        }
      )

    }
  }
}
