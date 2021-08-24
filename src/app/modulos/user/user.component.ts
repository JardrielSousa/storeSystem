import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { CustomValidator } from '../../validators/CustomValidator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  users=[];
  user:any;
  isCreation=false;
  isDelete = false;
  id:any;
  errorMessage: any;

  constructor(private userService:UserService ,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const del = this.route.snapshot.paramMap.get('del');

    if(id){
      this.id = id;
      this.userService.readById(id).subscribe((resp:any)=>{
        this.user = resp
      });
      this.isCreation = false;
    }else{
      this.isCreation = true;
    }
  }

  userForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    email: ['', [Validators.minLength(4), Validators.maxLength(256)]],
    password: [
      '',[Validators.minLength(4), Validators.maxLength(256)]
    ],
  });


  onSubmit(){
    this.userForm.markAllAsTouched();
    this.userService.create(this.userForm.value).subscribe(product=>{
        this.userService.verMsg('user created!!',false);
      });
    this.router.navigate(['home']);

  }

  onDelete(){
    this.userService.delete(this.id)
    .subscribe((resp:any)=>{
      this.userService.verMsg('user delete!!',false);
      this.router.navigate(['home']);
    });
  }

  onChange(){
    this.userService.update(this.id, this.userForm.value).subscribe(product=>{
      this.userService.verMsg('user changed!!',false);
    }, error =>{this.errorMessage = error.message
      this.userService.verMsg(error.message,true);
    });
  }

  get f() {
    return this.userForm.controls
  }
}
