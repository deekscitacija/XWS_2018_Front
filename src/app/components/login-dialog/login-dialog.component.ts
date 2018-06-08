import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: [ ]
})
export class LoginDialogComponent implements OnInit {

  private prijavaForma: any;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
              private userService: UserService) { }

  ngOnInit() {

    this.prijavaForma = new FormGroup({
      username : new FormControl(""),
      password : new FormControl("")
    })

  }

  potvrdi = function(val: any){
    this.userService.login(val).subscribe((res: any) => {
      console.log('juhuuuu')
      if(res.success == true){
        this.dialogRef.close(res.responseBody);
      }else{
        alert(res.message);
      }
    })
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

  zaboravljenaLozinka(){

  }

}
