import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service'
import { replaceVarInExpression } from '@angular/compiler/src/output/output_ast';

var data = []

@Injectable()
export class ControlFormService {
  static credentials = {}
  static doctorsDetails: any[] = []
  loginResult: any
  data: any[]

  static reInitialize() {
    ControlFormService.credentials = {}
  }
  constructor(private httpRequest: HttpRequestService) {
    console.log('service:', this.data)
   }

  ngOnInit() {
    this.data = data
  }

  validateOnSignup(values: any) {

    var matchingUsers = data.filter(user => user.nickname === values.nickname || user.login === values.login)
    if (matchingUsers.length > 0) {
      if (matchingUsers[0].login === values.login) {
        return 'login'
      }
      return 'nickname'
    }
    return ''
  }

  validateOnLogin(values: any) {
    return this.httpRequest.postCredentials('http://localhost:4200/api/userlogin', { 'username': values.login, 'password': values.password })
  }

  addUser(values: any) {
    data.push(values)
    this.data = data
    console.log('users:', this.data)
  }

  getHealthProDetails(token: string, healthProIds: string) {
    return this.httpRequest.postCredentials('http://localhost:4200/api/userlogin/healthPro', { 'token': token, 'healthProIds': healthProIds })
  }

  putPatientDetails(patient: any) {
    return this.httpRequest.putDetails('http://localhost:4200/api/userlogin', patient)
  }

  logoutUser(token: string) {
    return this.httpRequest.get('http://localhost:4200/api/userlogin/logout/' + token)
  }
}
