import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ ]
})
export class ForgotPasswordComponent implements OnInit {

  private promeniForma: any; 

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.promeniForma = new FormGroup({
      username : new FormControl("",Validators.compose([
        Validators.required
      ]))
    })

  }

  potvrdi = function(val: any){
    console.log(val)

    this.userService.resetPasswordToken(val).subscribe((res: any) => {
      console.log(res)
      alert(res.message)
    })

  }

}
