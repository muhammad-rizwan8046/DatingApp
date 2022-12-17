import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingApp';

  constructor(private accountService: AccountService){ }

  ngOnInit(): void {
    this.setCurrentUser();
  }
  
  setCurrentUser()
  {
    const UserString = localStorage.getItem('user');
    if(!UserString) return;
    const user: User = JSON.parse(UserString);
    this.accountService.setCurrentUser(user);
  }
}
