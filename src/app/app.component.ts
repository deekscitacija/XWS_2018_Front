import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: string = 'app';

  private regUser: any;

  constructor(private loginDialog: MatDialog, private registerDialog: MatDialog, private router: Router, 
                private tokenService: TokenService) { }

  ngOnInit() {

    if(localStorage.getItem('userToken') != undefined){
      this.parseToken();
    }

  }

  login = function(){

    let dialogRefLogin = this.loginDialog.open(LoginDialogComponent, {
      data: 'pozdraaaava'
    })

    dialogRefLogin.afterClosed().subscribe((result:any) => {
      
      if(result != null && result != undefined){
        if(result == 1){
          this.router.navigate(['/passwordReset'])
        }else{
          localStorage.setItem('userToken', result);
          this.parseToken();
        }
      }
    })
  
  }

  register = function(){
    this.router.navigate(['/register']);
  }

  signOut(){
    this.regUser = undefined;
    localStorage.removeItem('userToken');
    window.location.reload();
  }

  viewProfile(){
    if(localStorage.getItem('userToken') != undefined){
      this.router.navigate(['/myProfile/'+this.regUser.username]);
    }
  }

  parseToken(){
    let tokenStr = localStorage.getItem('userToken');
    let pomStr = JSON.parse(window.atob(tokenStr.split('.')[1]));

    if(pomStr.istice < new Date().getTime()){
      console.log('brise se token')
      localStorage.removeItem('userToken');
      return;
    }

    this.regUser = {};
    this.regUser.id = pomStr.id;
    this.regUser.role = pomStr.uloga[0].authority;
    this.regUser.username = pomStr.sub;
  }
}
