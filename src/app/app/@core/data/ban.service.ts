import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ban } from './ban';

@Injectable()
export class BanService {

  private bansUrl = `api/bans`;
  
  constructor(private http: Http) { }

  getBans(): Promise<Ban[]> {
    return this.http.get(this.bansUrl)
               .toPromise()
               .then(response => response.json().data as Ban[])
               .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }