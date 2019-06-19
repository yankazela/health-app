import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpRequestService {

  httpOptions = new RequestOptions({ headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })})

  constructor(private http: Http) { }
  
  postCredentials(url: string, data: any) {
    return this.http.post(url, data, this.httpOptions)
  }

  get(url: string) {
    return this.http.get(url)
  }
}