import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-doctors-details',
  templateUrl: './doctors-details.component.html',
  styleUrls: ['./doctors-details.component.css']
})
export class DoctorsDetailsComponent implements OnInit {
  credentials: any
  constructor(private router: Router, private controlForm: ControlFormService) { }

  ngOnInit() {
    this.setCredentials()
  }
  
  setCredentials() {
    this.credentials = ControlFormService.credentials
    if (!this.credentials.token) {
      this.router.navigate(['/login'])
    } else if (this.credentials.doctorsDetails.length < 1) {
      this.controlForm.getHealthProDetails(this.credentials.token, this.credentials.healthProIds)
      .subscribe(results => {
        this.credentials.doctorsDetails = JSON.parse(results.json().replace(/'/g, '"'));
        ControlFormService.doctorsDetails = this.credentials.doctorsDetails
      },
      (error) => {
        console.log('error:', error.message)
        alert('An unexpected error occured please try again')
      }
    )}
  }
  backToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}
