import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  logins=[];
  login:any;
  isCreation=false;
  isDelete = false;
  id:any;
  errorMessage: any;

  constructor(private sessionService:SessionService ,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

  }

  loginForm = this.fb.group({
    email: ['', [Validators.minLength(4), Validators.maxLength(256)]],
    password: [
      '',[Validators.minLength(4), Validators.maxLength(256)]
    ],
  });


  onSubmit(){
    this.loginForm.markAllAsTouched();
    this.sessionService.create(this.loginForm.value).subscribe(login=>{
        this.sessionService.verMsg('login authorized!!',false);
        console.log(login);

        this.router.navigate(['home']);
      },error=>{
        this.errorMessage = error.message;
        this.sessionService.verMsg(this.errorMessage,true);
        this.router.navigate(['login']);
      });

  }

  get f() {
    return this.loginForm.controls
  }

}
