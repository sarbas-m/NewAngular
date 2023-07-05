import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  //create a constructor
  constructor(private router:Router){

  }
  canActivate(
    route:ActivatedRouteSnapshot):boolean{
      //check role :current role vs expected role

      //expected role from url
      const expectedRole=route.data.role;

      //current role in session storage
      const currentRole=sessionStorage.getItem("ACCESS_ROLE");

      if(currentRole!=expectedRole){
        this.router.navigateByUrl('login');
        return false;
      }
      return true;

    }
  
}
