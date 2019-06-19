import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  credentials: any
  response: any
  status: boolean = false

  constructor(private controlForm: ControlFormService, private router: Router) {}

  ngOnInit() {
    this.processLogout()
  }

  processLogout() {
    this.credentials = ControlFormService.credentials
    this.controlForm.logoutUser(this.credentials.token).subscribe(result => {
      this.response = JSON.parse(result['_body'].replace(/'/g, '"'))
      this.status = true
      ControlFormService.reInitialize()
    },
    (error => {
      this.response = { status: 'Failed'}
      this.status = true
      console.error(error.message)
    }
    ))
  }

  goToHomePage() {
    this.router.navigate(['/'])
  }

}
