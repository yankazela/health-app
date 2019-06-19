import { Component, OnInit } from '@angular/core';
import { ControlFormService } from '../control-form.service'
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from '../models/users'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup
  message: string
  leagues = [{leagueName: 'Champions league'}, {leagueName: 'La Liga'}, {leagueName: 'Calcio'}, {leagueName: 'Bundesliga'}]
  constructor(private controlForm: ControlFormService, private router: Router, private builder: FormBuilder) { }

  ngOnInit() {
    const checkBoxes = this.leagues.map(league => new FormControl(false))
    this.userForm = this.builder.group({
      nickname: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      forums: new FormArray(checkBoxes)
    })
  }

  onSubmit() {
    this.message = this.controlForm.validateOnSignup(this.userForm.value)
    if (this.userForm.value.password !== this.userForm.value.confirm) {
      this.message = 'password'
    }
    if (this.message !== '') {
      return
    }
    const selectedForums = this.userForm.value.forums
      .map((checked, i) => checked ? this.leagues[i].leagueName : null)
      .filter(value => value !== null)
    const userData = new User(this.userForm.value.nickname, this.userForm.value.login, this.userForm.value.password, selectedForums)
    this.controlForm.addUser(userData.get())
    this.router.navigate(['/login'])
  }
}

