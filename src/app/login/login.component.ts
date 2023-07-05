import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import{AuthService} from'../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm:FormGroup;
  isSubmitted=false;
  error:string='';


  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    //this .loginform is a property that will hold the formdata and validationstatus.
    //this.formbuilder is an instance of the formbuilder class which is created by angular,used to simplify the creations of reactive forms
    this.loginForm=this.formBuilder.group({
    //formcontrolname fields
    userName:['',Validators.required],
    password:['',Validators.required]
    })
  }
  //get all controls for validation
  get formControls(){
    return this.loginForm.controls;
  }
  loginCredentials(){
    console.log(this.loginForm.value);
    this.isSubmitted=true;
    console.log("Submitted form for credentials");

    //form is invalid
    if(this.loginForm.invalid){
      this.error="Sorry! invalid entry..try again";

    }
    //form is valid
    if(this.loginForm.valid){
      console.log("submitted with valid")


          //calling method from authservice
    this.authService.loginVerify(this.loginForm.value).subscribe(
      response=>{
        this.error='';
        console.log(response);
        //set sessionstorage and localstorage(browser->inspect->application)
        //SessionStorage-changes browser to browser
        //store the values of response.uName and response.roleId
        //representating the username and access role in the browser 
        sessionStorage.setItem('USERNAME',response.data.username);
        sessionStorage.setItem('ACCESS_ROLE',response.data.role.toString());

        //stores the same value in browsers local storage.The difference is that sessionStorage data
        //is cleared when the browser session ends.
        //while local data storage persists across browser session 
        //localstorage--same for all browsers.
        localStorage.setItem('USERNAME',response.data.username)
        localStorage.setItem('ACCESS_ROLE',response.data.role.toString())

        if(response==null){
          this.error="invalid username and or password";

        }
        else if(response.data.role==1){
          this.router.navigateByUrl('emp-list')
          console.log('admin')
        }else if(response.data.role==2){
          this.router.navigateByUrl('receptionist')
          console.log('receptionist')
        }else{
          this.error="sorry!you are not allowed to acces the system"
        }

      },error=>{
        console.log(error)
        this.error="invalid username or password !please try agin"
      }
    )

    }


  }

}
