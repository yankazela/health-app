import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { Router } from '@angular/router'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  credentials: any
  editData: boolean = true
  constructor(private controlForm: ControlFormService, private router: Router) { }

  ngOnInit() {
    this.setCredentials()
  }

  setCredentials() {
    this.credentials = ControlFormService.credentials
    if (!this.credentials.token) {
      this.router.navigate(['/login'])
      return
    }
  }

  getDoctorsDetails() {
    if (ControlFormService.doctorsDetails.length > 0) {
      this.router.navigate(['/healthpro'])
      return
    }
    this.controlForm.getHealthProDetails(this.credentials.token, this.credentials.healthProIds)
      .subscribe(results => {
        this.credentials.doctorsDetails = JSON.parse(results.json().replace(/'/g, '"'));
        ControlFormService.doctorsDetails = Array.isArray(this.credentials.doctorsDetails) ? this.credentials.doctorsDetails: []
        this.router.navigate(['/healthpro'])
      },
      (error) => {
        console.log('healthprof:', error.message)
        alert('An unexpected error occured please try again')
      }
      )
  }

  editProfile() {
    this.router.navigate(['/editprofile'])
  }

}
