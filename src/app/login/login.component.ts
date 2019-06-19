import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMessage: string
  showMessage: boolean = false
  constructor(private controlForm: ControlFormService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.controlForm.validateOnLogin(form.value)
      .subscribe( results => {
        var loginResult = JSON.parse(results.json().replace(/'/g, '"'))
        if (loginResult.token) {
          loginResult.doctorsDetails = []
          ControlFormService.credentials = loginResult;
          this.router.navigate(['/dashboard'])
        } else {
          this.showMessage = true
          this.loginMessage = 'Invalid credentials'
          return
        }
      },
      (error) => {
        console.log('login error:', error.message)
        this.showMessage = true
        this.loginMessage = 'Invalid credentials'
        return
      })
  }

}
