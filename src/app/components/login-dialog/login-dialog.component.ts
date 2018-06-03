import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  private prijavaForma: any;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.prijavaForma = new FormGroup({
      username : new FormControl(""),
      password : new FormControl("")
    })

  }

  potvrdi = function(val: any){
    this.dialogRef.close(val);
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

}
