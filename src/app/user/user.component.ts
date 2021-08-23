import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  users=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.readAll().
    subscribe((resp)=>{
      this.users = resp
      console.log(this.users);

    });
  }

}
