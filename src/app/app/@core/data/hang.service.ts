import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hang } from './hang';

@Injectable()
export class HangService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private HangsUrl = `api/hangs`;
  
  constructor(private http: Http) { }

  getHangs(): Promise<Hang[]> {
    return this.http.get(this.HangsUrl)
               .toPromise()
               .then(response => response.json() as Hang)
               .catch(this.handleError);
  }

  getHang(id: string): Promise<Hang> {
    const url = `${this.HangsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hang)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.HangsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(hang: Hang): Promise<Hang> {
    const url = `${this.HangsUrl}/${hang._id}`;
    return this.http
      .put(url, JSON.stringify(hang), {headers: this.headers})
      .toPromise()
      .then(() => hang)
      .catch(this.handleError);
  }

  create(hang: Hang): Promise<Hang> {
    return this.http
      .post(this.HangsUrl, JSON.stringify(hang), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hang)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}