import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!this.tokenStorageService.getToken();

    if(isLoggedIn) {
      console.log("User authenticated!");
      this.router.navigate(['/dashboard']);
      return false;
    }

    console.log("User not authenticated");

    return true;
  }
  
}
