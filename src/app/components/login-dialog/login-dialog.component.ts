import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: [ ]
})
export class LoginDialogComponent implements OnInit {

  private prijavaForma: any;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
              private alertService: AlertService, private tokenService: TokenService ) { }

  ngOnInit() {

    this.prijavaForma = new FormGroup({
      username : new FormControl(""),
      password : new FormControl("")
    })

  }

  potvrdi = function(val: any){
    this.tokenService.login(val).subscribe((res: any) => {
      if(res.success == true){
        this.dialogRef.close(res.responseBody);
      }else{
        this.alertService.success(res.message);
      }
    })
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

  zaboravljenaLozinka(){
    this.dialogRef.close(1);
  }

}
