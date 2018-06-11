import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { AlertService } from '../../services/alert.service';
import { CityCountryService } from '../../services/city-country.service';

@Component({
  selector: 'app-change-personal-info',
  templateUrl: './change-personal-info.component.html',
  styleUrls: [ ]
})
export class ChangePersonalInfoComponent implements OnInit {

  @Input() regUser: any;

  private registracijaForma: any;
  private countries: any[];
  private cities: any[];

  constructor(private userService : UserService, private cityCountryService : CityCountryService, private router: Router, 
    private tokenService: TokenService, private alertService: AlertService ) { }

  ngOnInit() {

    this.registracijaForma = new FormGroup({
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
      postbroj : new FormControl("",Validators.pattern(/^[0-9\s]*$/))
    })

    this.patchFormValues();

    this.cityCountryService.getAllCountries().subscribe((res: any) => {
      this.countries = res.responseBody;
    })
  }

  potvrdi(val: any){
    let tempUser = { name : val.ime, surname : val.prezime, city : { name : val.grad, postcode : val.postbroj, country : { id: val.drzava} }, homeAddress : val.adresa, registeredUser : { email : val.email, phoneNumber : val.telefon } };

    this.userService.changePersonalInfo(tempUser).subscribe((res: any) => {
      console.log(res)
      if(res.success){
        window.location.reload();
      }else{
        this.alertService.error(res.message);
      }
    })
  }

  patchFormValues(){
    this.registracijaForma.patchValue({ime: this.regUser.name});
    this.registracijaForma.patchValue({prezime: this.regUser.surname});
    this.registracijaForma.patchValue({drzava: this.regUser.city.country.id});
    this.registracijaForma.patchValue({grad: this.regUser.city.name});
    this.registracijaForma.patchValue({postbroj: this.regUser.city.postcode == null ? "" : this.regUser.city.postcode});
    this.registracijaForma.patchValue({adresa: this.regUser.homeAddress == null ? "" : this.regUser.homeAddress});
    this.registracijaForma.patchValue({email: this.regUser.registeredUser.email});
    this.registracijaForma.patchValue({telefon: this.regUser.registeredUser.phoneNumber == null ? "" : this.regUser.registeredUser.phoneNumber});
  }

}
