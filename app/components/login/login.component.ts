import { Component } from '@angular/core';

import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  providers: [LoginService],
  styleUrls: ['./login.css']
})

export class LoginComponent {
  constructor() { }
}