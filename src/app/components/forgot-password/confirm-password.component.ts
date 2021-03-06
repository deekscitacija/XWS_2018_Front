import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { UserService } from '../../services/user.service'; 
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: [ ]
})
export class ConfirmPasswordComponent implements OnInit {

  private promeniForma: any; 
  private izaberiLozinku: any;
  private mode: number;
  private userUsername: string;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, 
                private alertService: AlertService) { }

  ngOnInit() {

    this.mode = 0;

    this.route.params.subscribe( params => {
        this.userUsername = params.username; 
    });

    this.promeniForma = new FormGroup({
      codeToken : new FormControl("",Validators.compose([
        Validators.required
      ]))
    })

    this.izaberiLozinku = new FormGroup({
        lozinka : new FormControl("",Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(90)
          ])),
          sifraPotvrda : new FormControl("",Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ]))
      }, this.passwordMatchValidator)

  }

  passwordMatchValidator = function(g: FormGroup) {
    return g.get('lozinka').value === g.get('sifraPotvrda').value ? null : {'missmatch': true};
  }

  potvrdi = function(val: any){
    val.username = this.userUsername;
    
    this.userService.checkToken(val).subscribe((res: any) => {
        if(res.success){
            this.alertService.success(res.message);
            setTimeout(() =>  {
                this.mode = 1;
            }, 2000);
        }else{
            this.alertService.error(res.message);
        }
    })

  }

  promeni = function(val: any){
    val.username = this.userUsername;
    
    this.userService.changePassword(val).subscribe((res: any) => {
        if(res.success){
            this.alertService.success(res.message);
            setTimeout(() =>  {
                this.router.navigate([''])
            }, 2000);
        }else{
            this.alertService.error(res.message);
        }
    })
  }

}
