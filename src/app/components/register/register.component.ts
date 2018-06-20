import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CityCountryService } from '../../services/city-country.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ ]
})
export class RegisterComponent implements OnInit {

  private registracijaForma: any;
  private countries: any[];
  private cities: any[];

  constructor(private userService : UserService, private cityCountryService : CityCountryService, private router: Router,
                private alertService: AlertService) { }

  ngOnInit() {

    this.registracijaForma = new FormGroup({
      username : new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i),
        Validators.maxLength(90)
      ])),
      lozinka : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(90)
      ])),
      sifraPotvrda : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      ime : new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])),
      prezime : new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])),
      drzava : new FormControl("",Validators.compose([
        Validators.required,
      ])),
      grad : new FormControl("",Validators.compose([
        Validators.required,
      ])),
      adresa : new FormControl("",Validators.compose([
        Validators.maxLength(60)
      ])),
      email : new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-z0-9._]{0,64}@[a-z]{2,10}(\\.[a-z]{2,10})+'),
        Validators.maxLength(90)
      ])),
      telefon : new FormControl("",Validators.pattern(/^[+]?[0-9\s]*$/)),
      postbroj : new FormControl("",Validators.pattern(/^[0-9\s]*$/)),
      tip : new FormControl("REG_USER", Validators.compose([
        Validators.required
      ]))
    }, this.passwordMatchValidator)

    this.cityCountryService.getAllCountries().subscribe((res: any) => {
      this.countries = res.responseBody;
    })

  }

  passwordMatchValidator = function(g: FormGroup) {
    return g.get('lozinka').value === g.get('sifraPotvrda').value ? null : {'missmatch': true};
  }

  registruj(val: any){

    console.log(val);
    
    this.userService.register(val).subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigate(['']);
      },
      (error: any) => {
        this.alertService.error("Username je zauset, promenite unos.");
      }
    );
    
  }

}
