import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  credentials: any
  editForm: FormGroup
  success: boolean = false
  message: string
  constructor(private controlForm: ControlFormService, private router: Router, private builder: FormBuilder) { }

  ngOnInit() {
    this.setCredentials()
    this.createEditForm()
  }

  setCredentials() {
    this.credentials = ControlFormService.credentials
    if (!this.credentials.token) {
      this.router.navigate(['/login'])
      return
    }
  }

  createEditForm() {
    this.editForm = this.builder.group({
      Username: [this.credentials.username, Validators.required],
      FirstName: [this.credentials.firstname, Validators.required],
      LastName: [this.credentials.lastname, Validators.required],
      DateOfBirth: [this.credentials.dateOfBirth, Validators.required],
      EmailAddress: [this.credentials.emailAddress],
      ContactNumber: [this.credentials.contactNumber],
    })
  }

  onSubmit() {
    var values = this.editForm.value
    values.token = this.credentials.token
    values.PatientId = this.credentials.userId
    values.Address = this.credentials.address
    var healthProIds = this.credentials.healthProIds.split(',')
    values.HealthProfessionalIds = []
    healthProIds.map(id => values.HealthProfessionalIds.push(parseInt(id)))
    this.controlForm.putPatientDetails(values)
      .subscribe(response => {
        console.log('profile data', response.json().replace(/'/g, '"'))
        try {
          var result = JSON.parse(response.json().replace(/'/g, '"'));
          if (result.token) {
            var newCredentials = result
            newCredentials.doctorsDetails = []
            ControlFormService.credentials = newCredentials
            this.success = true
            this.message = "Your information has been successfully updated"
          }
        } catch (error) {
          console.log('error update:', error.message)
          this.message = "We were unable to updated your information, please try again"
        }
      },
      (error => {
        console.log('error update:', error.message)
        this.message = "We were unable to updated your information, please try again"
      }))
  }

  backToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}
