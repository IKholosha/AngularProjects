import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = { id: null, name: '' , profession: '' };
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsersH()
      .subscribe(users => this.users = users);
  }

  refresh(){
    this.getUsers();
  }

  editUser(user: User){
    this.user = user;
    this.getUsers();
  }

  addUser(){

    this.user.name = this.user.name.trim();
    this.user.profession = this.user.profession.trim();
    if (!this.user.id || !this.user.name || !this.user.profession) { return; }

    this.userService.addUser(this.user)
      .subscribe(() => this.getUsers());
  }

  deleteUser(user: User){
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe(() => this.getUsers());
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.getUsers());
  }
}


