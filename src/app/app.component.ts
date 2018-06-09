import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: string = 'app';

  private regUser: any;

  constructor(private loginDialog: MatDialog, private registerDialog: MatDialog, private router: Router) { }

  ngOnInit() {

  }


  login = function(){

    let dialogRefLogin = this.loginDialog.open(LoginDialogComponent, {
      data: 'pozdraaaava'
    })

    dialogRefLogin.afterClosed().subscribe((result:any) => {
      console.log(result)
      if(result != null && result != undefined){
        if(result == 1){
          this.router.navigate(['/passwordReset'])
        }else{
          this.regUser = result;
        }
      }
    })
  
  }

  register = function(){
    this.router.navigate(['/register']);
  }

  signOut(){
    this.regUser = undefined;
  }
}
