import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private regUser: any = {city : {country : {}}, registeredUser : {}};
  private promena: boolean = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {

    this.promena = false;

    if(localStorage.getItem('userToken') != undefined){
      this.tokenService.getUserFromToken().subscribe((res: any) => {
        if(res.success){
          this.regUser = res.responseBody;
        }else{
          this.router.navigate(['']);
        }
      })
    }else{
      this.router.navigate(['']);
    }


  }

  izmeniPodatke = function(){
    this.promena = !this.promena;
  }

}
