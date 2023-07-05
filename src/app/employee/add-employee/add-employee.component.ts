import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.employeeService.BindDepartments();
  }
  onSubmit(form:NgForm){
    let addId=this.employeeService.formData.id;
    if(addId==0||addId==null){
     
      console.log(form.value);
      this.InsertRecord(form);
    }
    else{
      this.updateRecord(form)
    }
  }

  //insert
  InsertRecord(form: NgForm) {
    console.log("inseting");
    this.employeeService.insertEmployee(form.value).subscribe(
      (result) => {
        console.log(result)
        //alert("Successfully added")
        this.toastr.success('Added Succesfully');
        this.router.navigate(['emp-list'])
      }
    )
  }
  updateRecord(form: NgForm){
    console.log("updating");
    this.employeeService.UpdateEmployee(form.value).subscribe(
      (result=>{
        console.log(result)
        this.resetForm(form);
        alert("successfully updated")
        this.router.navigate(['emp-list']);
        
      })
    )
  }
  //Reset form
  resetForm(form: NgForm){
    if(form!=null){
      form.resetForm
    }
  }

}
